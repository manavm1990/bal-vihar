import { createClient, isHttpError, type SanityClient, type SanityDocument } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { readSheet } from "read-excel-file/universal";
import {
  type CalendarEvent,
  createEventKey,
  findPossibleDuplicates,
  type Problem,
  parseCalendarEvents,
} from "./calendar";
import { type Row, SheetError } from "./sheet";
import { parseVolunteerRoster, type VolunteerActivity } from "./volunteers";

interface ExistingEvent {
  date: string;
  title: string;
}

interface ImportResult {
  report: string;
  undo?: UndoRecord;
}

interface SpreadsheetImportEvent {
  _id: string;
  fileRef?: string | null;
  fileUrl?: string | null;
  kind?: string | null;
  schoolYear?: string | null;
}

type UndoRecord =
  | { kind: "calendar"; createdIds: string[] }
  | { kind: "volunteerRoster"; draft: SanityDocument | null; published: SanityDocument | null };

const API_VERSION = "2025-05-08";
const FETCH_TIMEOUT_MS = 30_000;
const MAX_LISTED_PROBLEMS = 20;
const ROSTER_ID = "volunteerRoster";

export const handler = documentEventHandler<SpreadsheetImportEvent>(async ({ context, event }) => {
  const { _id, fileRef } = event.data;
  const client = createClient({ ...context.clientOptions, apiVersion: API_VERSION, useCdn: false });
  const isDryRun = context.local === true;

  const { report, undo } = await runImport(client, event.data, isDryRun).catch(describeFailure);

  console.info(report);
  if (isDryRun) return;

  // No revision lock: a retry would import again and record the wrong undo. If a newer file was
  // attached meanwhile, its own run reports and records the undo, so this one leaves them alone.
  const currentFile = await client.fetch<string | null>("*[_id == $id][0].file.asset._ref", {
    id: _id,
  });
  if (currentFile !== fileRef) return;

  const patch = client.patch(_id).set({ importReport: report, processedFile: fileRef });

  await (undo ? patch.set({ undoData: JSON.stringify(undo) }) : patch.unset(["undoData"])).commit();
});

const createReport = (summary: string, details: string[] = []) =>
  [`${formatNow()}: ${summary}`, ...details].join("\n");

function describeFailure(error: unknown): ImportResult {
  if (error instanceof SheetError)
    return { report: createReport(`Nothing was imported: ${error.message}`) };

  console.error("Spreadsheet import failed", error);

  const reason = isHttpError(error)
    ? `Sanity would not save it (${error.message})`
    : "something went wrong, so please try again";

  return { report: createReport(`Nothing was imported: ${reason}.`) };
}

const formatNow = () =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date());

const formatShortDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

async function importCalendar(
  client: SanityClient,
  rows: Row[],
  isDryRun: boolean,
): Promise<ImportResult> {
  const { events, problems } = parseCalendarEvents(rows);
  if (events.length === 0 && problems.length === 0)
    throw new SheetError("no events were found below the headings.");

  const existing = await client.fetch<ExistingEvent[]>(
    '*[_type == "calendarEvent"]{"date": coalesce(date, ""), "title": coalesce(title, "")}',
  );
  const existingKeys = new Set(existing.map(({ date, title }) => createEventKey(date, title)));
  const added = events.filter(({ date, title }) => !existingKeys.has(createEventKey(date, title)));
  const alreadyListed = events.length - added.length;
  const lookalikes = findPossibleDuplicates(added, existing);
  const created = added.map((event) => ({ _id: crypto.randomUUID(), ...toCalendarEvent(event) }));
  const undo: UndoRecord | undefined =
    created.length > 0
      ? { kind: "calendar", createdIds: created.map(({ _id }) => _id) }
      : undefined;

  if (!isDryRun && created.length > 0)
    await created
      .reduce((transaction, event) => transaction.create(event), client.transaction())
      .commit();

  const summary = [
    `${added.length} ${added.length === 1 ? "event" : "events"} added`,
    alreadyListed > 0 && `${alreadyListed} already on the calendar`,
    problems.length > 0 && `${problems.length} skipped`,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    report: createReport(`${summary}.`, [
      ...lookalikes.map(
        ({ added, existing }) =>
          `Check ${formatShortDate(added.date)}: “${added.title}” was added next to “${existing.title}”. If one replaces the other, delete the old one in Calendar.`,
      ),
      ...listProblems(problems),
    ]),
    ...(undo ? { undo } : {}),
  };
}

async function importVolunteerRoster(
  client: SanityClient,
  rows: Row[],
  schoolYear: string | null | undefined,
  isDryRun: boolean,
): Promise<ImportResult> {
  const { activities, skippedRows, volunteerCount } = parseVolunteerRoster(rows);
  if (!schoolYear) throw new SheetError("pick the school year, then publish again.");
  if (activities.length === 0) throw new SheetError("no volunteers with events were found.");

  const [published, draft] = await Promise.all([
    client.getDocument(ROSTER_ID),
    client.getDocument(`drafts.${ROSTER_ID}`),
  ]);

  if (!isDryRun) await replaceRoster(client, schoolYear, activities, draft !== undefined);

  return {
    report: createReport(
      `${volunteerCount} volunteers across ${activities.length} events imported for ${schoolYear}. The event volunteers list was replaced. Click “Undo last upload” to put the old list back.`,
      skippedRows > 0
        ? [`${skippedRows} rows had no events, for example people who declined, and were left out.`]
        : [],
    ),
    undo: { kind: "volunteerRoster", published: published ?? null, draft: draft ?? null },
  };
}

const listProblems = (problems: Problem[]) => [
  ...problems
    .slice(0, MAX_LISTED_PROBLEMS)
    .map(({ row, reason }) => `Skipped row ${row}: ${reason}.`),
  ...(problems.length > MAX_LISTED_PROBLEMS
    ? [`…and ${problems.length - MAX_LISTED_PROBLEMS} more rows skipped.`]
    : []),
];

async function readRows(fileUrl: string) {
  const response = await fetch(fileUrl, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new SheetError(`the file could not be downloaded (${response.status}).`);

  try {
    return await readSheet(await response.blob());
  } catch (error) {
    console.error("Could not read the workbook", error);
    throw new SheetError(
      "the file could not be read. Save it as an .xlsx workbook and upload it again.",
    );
  }
}

async function replaceRoster(
  client: SanityClient,
  schoolYear: string,
  activities: VolunteerActivity[],
  hasDraft: boolean,
) {
  const fields = { schoolYear, activities: activities.map(toActivity) };
  const transaction = client
    .transaction()
    .createOrReplace({ _id: ROSTER_ID, _type: "volunteerRoster", ...fields });

  if (hasDraft) transaction.patch(`drafts.${ROSTER_ID}`, { set: fields });

  await transaction.commit();
}

async function runImport(
  client: SanityClient,
  { fileUrl, kind, schoolYear }: SpreadsheetImportEvent,
  isDryRun: boolean,
) {
  if (!fileUrl) throw new SheetError("no file was attached.");

  const rows = await readRows(fileUrl);

  if (kind === "calendar") return importCalendar(client, rows, isDryRun);
  if (kind === "volunteerRoster") return importVolunteerRoster(client, rows, schoolYear, isDryRun);

  throw new SheetError("pick what the file contains, then publish again.");
}

const toActivity = ({ name, volunteers }: VolunteerActivity) => ({
  _type: "volunteerActivity",
  _key: crypto.randomUUID().slice(0, 12),
  name,
  volunteers,
});

const toCalendarEvent = (event: CalendarEvent) => ({ _type: "calendarEvent", ...event });
