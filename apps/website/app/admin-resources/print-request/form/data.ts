import type { PrintRequestInputs } from "./types";

export function createPrintRequestFormData({ file, ...fields }: PrintRequestInputs) {
  const formData = new FormData();

  formData.set("fields", JSON.stringify(fields));
  formData.set("file", file);

  return formData;
}

export function parsePrintRequestFormData(formData: FormData): unknown {
  const fieldsJson = formData.get("fields");
  if (typeof fieldsJson !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(fieldsJson);
  } catch {
    return null;
  }

  return typeof fields !== "object" || fields === null
    ? fields
    : ({ ...fields, file: formData.get("file") ?? undefined } as const);
}
