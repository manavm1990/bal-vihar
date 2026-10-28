export interface HighlightPart {
  text: string;
  isMatch: boolean;
}

export interface SearchDocument {
  id: string;
  title: string;
  section: string;
  href: string;
  text: string;
  boost?: number;
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  title: HighlightPart[];
  snippet: HighlightPart[];
}

export const parseSearchQuery = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.trim().slice(0, 100) ?? "";
