import type { AwardApplicationInputs } from "./types";

const DOCUMENT_KEYS = ["trackingLog", "signOffProof", "outsideProof"] as const;

export function createAwardFormData({
  trackingLog,
  signOffProof,
  outsideProof,
  ...fields
}: AwardApplicationInputs) {
  const formData = new FormData();
  const documents = { trackingLog, signOffProof, outsideProof };

  formData.set("fields", JSON.stringify(fields));

  for (const key of DOCUMENT_KEYS) {
    const document = documents[key];
    if (document) formData.set(key, document);
  }

  return formData;
}

export function parseAwardFormData(formData: FormData): unknown {
  const fieldsJson = formData.get("fields");
  if (typeof fieldsJson !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(fieldsJson);
  } catch {
    return null;
  }

  if (typeof fields !== "object" || fields === null) return fields;

  return {
    ...fields,
    ...Object.fromEntries(DOCUMENT_KEYS.map((key) => [key, formData.get(key) ?? undefined])),
  } as const;
}
