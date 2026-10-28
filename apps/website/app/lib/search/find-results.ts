import { searchAlgolia } from "./algolia";
import type { HighlightPart, SearchResult } from "./search";

export interface SearchHit {
  id: string;
  href: string;
  section: string;
  title: HighlightPart[];
  snippet: HighlightPart[];
}

export const findResults = (query: string, limit: number) => searchAlgolia(query, limit);

export const createSearchHit = ({ document, title, snippet }: SearchResult): SearchHit => ({
  id: document.id,
  href: document.href,
  section: document.section,
  title,
  snippet,
});
