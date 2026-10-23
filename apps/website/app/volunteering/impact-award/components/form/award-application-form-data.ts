import type { AwardApplicationInputs } from "./award-application.types";

const FILE_KEYS = ["trackingLog", "signOffProof", "outsideProof"] as const;

/**
 * Rebuilds the unvalidated input on the server;
 * the schema decides whether it is acceptable.
 */
export function fromAwardFormData(formData: FormData): unknown {
  const raw = formData.get("fields");
  if (typeof raw !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof fields !== "object" || fields === null) return fields;

  return {
    ...fields,
    ...Object.fromEntries(FILE_KEYS.map((key) => [key, formData.get(key) ?? undefined])),
  };
}

/**
 * Server actions take `FormData` for uploads:
 * the fields travel as JSON, each document as a file.
 */
export function toAwardFormData({
  trackingLog,
  signOffProof,
  outsideProof,
  ...fields
}: AwardApplicationInputs): FormData {
  const formData = new FormData();
  const files = { trackingLog, signOffProof, outsideProof };

  formData.set("fields", JSON.stringify(fields));
  for (const key of FILE_KEYS) {
    const file = files[key];
    if (file) formData.set(key, file);
  }

  return formData;
}
