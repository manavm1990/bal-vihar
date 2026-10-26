import type { IndexSettings, SearchParams } from "algoliasearch";

/**
 * Markers Algolia wraps around matches. Chosen so they never appear in page copy and never look
 * like HTML the browser would run.
 */
export const HIGHLIGHT_END = "⟧";
export const HIGHLIGHT_START = "⟦";

/** How many objects each write batch carries. Small enough for a serverless reindex, large enough to stay quick. */
export const INDEX_BATCH_SIZE = 500;

/**
 * Algolia's hard ceiling is 10 KB per record. Stay under it and leave room for keys and JSON
 * overhead; long bodies are shortened until the payload fits.
 */
export const MAX_RECORD_BYTES = 9000;

/** First cut of body text before the size-fit loop trims further. */
export const MAX_TEXT_LENGTH = 8000;

/**
 * Index settings for the public site under the Algolia Open Source (AOS) plan. English-language
 * helpers and “drop trailing words if needed” make parent queries like “class schedule sunday”
 * still hit useful pages. Apply with `?configure=true` on the reindex route.
 */
export const ALGOLIA_INDEX_SETTINGS = {
  searchableAttributes: ["unordered(title)", "unordered(section)", "unordered(text)"],
  attributesToRetrieve: ["title", "section", "href"],
  attributesToHighlight: ["title"],
  attributesToSnippet: ["text:40"],
  customRanking: ["desc(boost)"],
  queryLanguages: ["en"],
  indexLanguages: ["en"],
  ignorePlurals: true,
  removeStopWords: true,
  removeWordsIfNoResults: "lastWords",
  typoTolerance: true,
  // Short parent queries (“fee”, “form”) still get one typo of slack.
  minWordSizefor1Typo: 3,
  minWordSizefor2Typos: 7,
  highlightPreTag: HIGHLIGHT_START,
  highlightPostTag: HIGHLIGHT_END,
  snippetEllipsisText: "…",
  // Prefer exact matches, then the page-level boost, without geo (this is not a map search).
  ranking: ["typo", "words", "filters", "proximity", "attribute", "exact", "custom"],
} as const satisfies IndexSettings;

/** Per-query options shared by live search and the full results page. */
export const ALGOLIA_SEARCH_PARAMS = {
  attributesToRetrieve: ["title", "section", "href"],
  attributesToHighlight: ["title"],
  attributesToSnippet: ["text:40"],
  highlightPreTag: HIGHLIGHT_START,
  highlightPostTag: HIGHLIGHT_END,
  // Hits only — skip facets, ranking info and other unused payload on every keystroke.
  responseFields: ["hits"],
} as const satisfies SearchParams;
