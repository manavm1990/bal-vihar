import { searchAlgolia } from "./algolia";
import { getSanitySearchDocuments } from "./sanity-documents";
import { type HighlightPart, type SearchResult, searchDocuments } from "./search";
import { STATIC_SEARCH_DOCUMENTS } from "./static-documents";

/** What the live search sends to the browser: no page text, only what a result row shows. */
export interface SearchHit {
  id: string;
  href: string;
  section: string;
  title: HighlightPart[];
  snippet: HighlightPart[];
}

/** Algolia first, which forgives typos. The built-in search takes over if Algolia is unavailable. */
export async function findResults(query: string, limit: number): Promise<SearchResult[]> {
  const fromAlgolia = await searchAlgolia(query, limit);
  if (fromAlgolia) return fromAlgolia;

  return searchDocuments(
    [...STATIC_SEARCH_DOCUMENTS, ...(await getSanitySearchDocuments())],
    query,
    { limit },
  );
}

export const toSearchHit = ({ document, title, snippet }: SearchResult): SearchHit => ({
  id: document.id,
  href: document.href,
  section: document.section,
  title,
  snippet,
});
