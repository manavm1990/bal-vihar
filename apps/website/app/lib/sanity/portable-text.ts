const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Flattens Portable Text blocks to plain text, whose words sit in `children[].text`. */
export function extractText(value: unknown): string {
  if (Array.isArray(value)) return value.map(extractText).join(" ");
  if (!isRecord(value)) return "";

  const text = value["text"];

  return [typeof text === "string" ? text : "", extractText(value["children"])]
    .filter(Boolean)
    .join(" ");
}
