import type { SearchDocument } from "./search";

export type AlgoliaSearchRecord = ReturnType<typeof createRecordWithText>;

const createRecordWithText = (document: SearchDocument, text: string) => ({
  objectID: document.id,
  title: document.title,
  section: document.section,
  href: document.href,
  text,
  boost: document.boost ?? 0,
});

export const createAlgoliaRecords = (documents: readonly SearchDocument[]): AlgoliaSearchRecord[] =>
  documents.map(createAlgoliaRecord);

export function createAlgoliaRecord(document: SearchDocument): AlgoliaSearchRecord {
  let text = document.text.slice(0, 8000);
  let record = createRecordWithText(document, text);

  while (Buffer.byteLength(JSON.stringify(record)) > 9000) {
    if (text.length === 0) break;
    text = text.slice(0, Math.max(0, Math.floor(text.length * 0.9)));
    record = createRecordWithText(document, text);
  }

  return record;
}
