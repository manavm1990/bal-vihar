import { API_VERSION } from "@bv/schemas/constants";
import { useState } from "react";
import type {
  DocumentActionDescription,
  DocumentActionProps,
  SanityClient,
  SanityDocument,
} from "sanity";
import { useClient } from "sanity";

type UndoRecord =
  | { kind: "calendar"; createdIds: string[] }
  | { kind: "volunteerRoster"; draft: SanityDocument | null; published: SanityDocument | null };

const ROSTER_ID = "volunteerRoster";

export default function UndoUploadAction({
  id,
  draft,
  published,
}: DocumentActionProps): DocumentActionDescription | null {
  const client = useClient({ apiVersion: API_VERSION });
  const [phase, setPhase] = useState<"idle" | "confirm" | "working" | "failed">("idle");
  const undo = parseUndo(published?.["undoData"]);

  if (!undo) return null;

  const close = () => setPhase("idle");

  const description: DocumentActionDescription = {
    label: "Undo last upload",
    tone: "caution",
    disabled: phase === "working",
    onHandle: () => setPhase("confirm"),
  };

  if (phase === "confirm")
    return {
      ...description,
      dialog: {
        type: "confirm",
        tone: "caution",
        message: describeUndo(undo),
        confirmButtonText: "Undo upload",
        onCancel: close,
        onConfirm: () => {
          setPhase("working");
          runUndo({
            client,
            hasDraft: draft !== null,
            id,
            report: published?.["importReport"],
            undo,
          })
            .then(close)
            .catch(() => setPhase("failed"));
        },
      },
    };

  if (phase === "failed")
    return {
      ...description,
      dialog: {
        type: "dialog",
        header: "Could not undo",
        content:
          undo.kind === "calendar"
            ? "Nothing was changed. One of the events is probably linked from a custom page: remove that link first, then try again."
            : "Nothing was changed. Please try again in a minute.",
        onClose: close,
      },
    };

  return description;
}

const describeUndo = (undo: UndoRecord) =>
  undo.kind === "calendar"
    ? `Delete the ${undo.createdIds.length} events the last upload added? Any changes made to them since are lost too.`
    : "Put back the event volunteers list as it was before the last upload? Changes made to the list since then are lost.";

const isUndoRecord = (value: unknown): value is UndoRecord =>
  typeof value === "object" &&
  value !== null &&
  "kind" in value &&
  (value.kind === "calendar" || value.kind === "volunteerRoster");

function parseUndo(value: unknown) {
  if (typeof value !== "string") return null;

  try {
    const parsed: unknown = JSON.parse(value);
    return isUndoRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function restoreDocument(document: SanityDocument) {
  const { _rev, _updatedAt, ...rest } = document;
  return rest;
}

async function runUndo({
  client,
  hasDraft,
  id,
  report,
  undo,
}: {
  client: SanityClient;
  hasDraft: boolean;
  id: string;
  report: unknown;
  undo: UndoRecord;
}) {
  const transaction = client.transaction();

  if (undo.kind === "calendar")
    for (const eventId of undo.createdIds) transaction.delete(eventId).delete(`drafts.${eventId}`);
  else {
    if (undo.published) transaction.createOrReplace(restoreDocument(undo.published));
    else transaction.delete(ROSTER_ID);

    if (undo.draft) transaction.createOrReplace(restoreDocument(undo.draft));
    else transaction.delete(`drafts.${ROSTER_ID}`);
  }

  const undone = `${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" })}: The last upload was undone.`;

  if (hasDraft) transaction.patch(`drafts.${id}`, { unset: ["undoData"] });

  await transaction
    .patch(id, {
      unset: ["undoData"],
      set: { importReport: typeof report === "string" ? `${undone}\n\n${report}` : undone },
    })
    .commit();
}
