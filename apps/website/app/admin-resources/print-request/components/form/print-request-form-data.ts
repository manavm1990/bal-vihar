import type { PrintRequestInputs } from "./print-request.types";

/**
 * Rebuilds the unvalidated input on the server;
 * the schema decides whether it is acceptable.
 */
export function fromPrintRequestFormData(formData: FormData): unknown {
  const raw = formData.get("fields");
  if (typeof raw !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(raw);
  } catch {
    return null;
  }

  return typeof fields !== "object" || fields === null
    ? fields
    : ({ ...fields, file: formData.get("file") ?? undefined } as const);
}

/**
 * Server actions take `FormData` for uploads:
 * the fields travel as JSON, the file as a file.
 */
export function toPrintRequestFormData({ file, ...fields }: PrintRequestInputs): FormData {
  const formData = new FormData();

  formData.set("fields", JSON.stringify(fields));
  formData.set("file", file);

  return formData;
}
