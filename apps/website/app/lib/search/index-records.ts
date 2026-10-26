import { MAX_RECORD_BYTES, MAX_TEXT_LENGTH } from "./algolia-config";
import type { SearchDocument } from "./search";

export { INDEX_BATCH_SIZE } from "./algolia-config";

/** One Algolia object ready to upload (keys match Algolia's API, including `objectID`). */
export type AlgoliaSearchRecord = ReturnType<typeof toRecord>;

/** Turns search documents into Algolia objects, each kept under the record size ceiling. */
export const createAlgoliaRecords = (documents: readonly SearchDocument[]): AlgoliaSearchRecord[] =>
  documents.map(createAlgoliaRecord);

/** One document → one record; shortens `text` until the JSON payload fits. */
export function createAlgoliaRecord(document: SearchDocument): AlgoliaSearchRecord {
  let text = document.text.slice(0, MAX_TEXT_LENGTH);
  let record = toRecord(document, text);

  while (Buffer.byteLength(JSON.stringify(record)) > MAX_RECORD_BYTES) {
    if (text.length === 0) break;
    text = text.slice(0, Math.max(0, Math.floor(text.length * 0.9)));
    record = toRecord(document, text);
  }

  return record;
}

const toRecord = (document: SearchDocument, text: string) => ({
  objectID: document.id,
  title: document.title,
  section: document.section,
  href: document.href,
  text,
  boost: document.boost ?? 0,
});
