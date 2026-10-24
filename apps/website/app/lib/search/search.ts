export interface HighlightPart {
  text: string;
  isMatch: boolean;
}

export interface SearchDocument {
  id: string;
  title: string;
  /** Where the page lives in the site, shown above the result title. */
  section: string;
  href: string;
  text: string;
  /** Added to the score on a match, so overview pages outrank passing mentions. */
  boost?: number;
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  title: HighlightPart[];
  snippet: HighlightPart[];
}

interface SearchOptions {
  limit?: number;
}

const MAX_QUERY_LENGTH = 100;
const MAX_TEXT_HITS = 5;
const PHRASE_BONUS = 20;
const SECTION_WEIGHT = 4;
const SNIPPET_RADIUS = 90;
const TITLE_WEIGHT = 10;
const WORD_START = "(?<![\\p{L}\\p{N}])";

/** Highlights where each term starts a word, so "teach" marks "teacher" and "teaching". */
export const highlightText = (text: string, terms: readonly string[]): HighlightPart[] =>
  terms.length === 0
    ? [{ text, isMatch: false }]
    : text
        .split(
          new RegExp(
            `(${WORD_START}(?:${terms.map(escapeRegExp).join("|")})[\\p{L}\\p{N}]*)`,
            "giu",
          ),
        )
        .flatMap((part, index) => (part === "" ? [] : [{ text: part, isMatch: index % 2 === 1 }]));

/** Reads the `q` search param: first value only, trimmed and capped. */
export const parseSearchQuery = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.trim().slice(0, MAX_QUERY_LENGTH) ?? "";

/**
 * Every word must appear somewhere in the document. Words match from the start of a word, so
 * "fee" finds "fees". Title hits count most, then the section, then the body.
 */
export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
  { limit = 20 }: SearchOptions = {},
): SearchResult[] {
  const terms = getSearchTerms(query);
  if (terms.length === 0) return [];

  const phrase = query.trim().toLowerCase();

  return documents
    .flatMap((document) => {
      const score = scoreDocument(document, terms, phrase);

      return score === 0
        ? []
        : [
            {
              document,
              score,
              title: highlightText(document.title, terms),
              snippet: createSnippet(document.text, terms),
            },
          ];
    })
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, limit);
}

function createSnippet(text: string, terms: readonly string[]) {
  const lower = text.toLowerCase();
  const hits = terms.map((term) => lower.search(createTermPattern(term))).filter((at) => at >= 0);
  const start = hits.length === 0 ? 0 : Math.max(0, Math.min(...hits) - SNIPPET_RADIUS);
  const space = text.indexOf(" ", start);
  // Start on a word boundary so the excerpt doesn't open mid-word.
  const wordStart = start === 0 || space === -1 ? start : space + 1;
  const end = Math.min(text.length, start + SNIPPET_RADIUS * 2);
  const excerpt = `${wordStart > 0 ? "…" : ""}${text.slice(wordStart, end).trim()}${end < text.length ? "…" : ""}`;

  return highlightText(excerpt, terms);
}

const countMatches = (text: string, term: string) =>
  text.match(new RegExp(`${WORD_START}${escapeRegExp(term)}`, "gu"))?.length ?? 0;

const createTermPattern = (term: string) => new RegExp(`${WORD_START}${escapeRegExp(term)}`, "u");

const escapeRegExp = (value: string) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

const getSearchTerms = (query: string) => [
  ...new Set(
    query
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((term) => term.length > 1 || /\d/.test(term))
      .map(stemTerm),
  ),
];

function scoreDocument(document: SearchDocument, terms: readonly string[], phrase: string) {
  const title = document.title.toLowerCase();
  const section = document.section.toLowerCase();
  const text = document.text.toLowerCase();
  let score = title.includes(phrase) ? PHRASE_BONUS : 0;

  for (const term of terms) {
    const termScore =
      (createTermPattern(term).test(title) ? TITLE_WEIGHT : 0) +
      (createTermPattern(term).test(section) ? SECTION_WEIGHT : 0) +
      Math.min(countMatches(text, term), MAX_TEXT_HITS);

    if (termScore === 0) return 0;
    score += termScore;
  }

  return score + (document.boost ?? 0);
}

/** Trailing "s" comes off so "teachers" finds "teacher"; matching is by prefix, so "class" still works. */
const stemTerm = (term: string) =>
  term.length > 3 && term.endsWith("s") ? term.slice(0, -1) : term;
