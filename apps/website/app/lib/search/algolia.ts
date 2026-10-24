import { algoliasearch } from "algoliasearch";

import type { HighlightPart, SearchResult } from "./search";

interface AlgoliaRecord {
  title: string;
  section: string;
  href: string;
}

const HIGHLIGHT_END = "⟧";
const HIGHLIGHT_START = "⟦";

/**
 * Searches the Algolia index with the search-only key. Gives null when Algolia isn't set up or
 * can't be reached, so the page falls back to the built-in search instead of showing an error.
 */
export async function searchAlgolia(query: string, limit: number): Promise<SearchResult[] | null> {
  const appId = process.env["ALGOLIA_APP_ID"];
  const searchKey = process.env["ALGOLIA_SEARCH_KEY"];
  const indexName = process.env["ALGOLIA_INDEX_NAME"];
  if (!appId || !searchKey || !indexName) return null;

  try {
    const { hits } = await algoliasearch(appId, searchKey).searchSingleIndex<AlgoliaRecord>({
      indexName,
      searchParams: {
        query,
        hitsPerPage: limit,
        attributesToHighlight: ["title"],
        attributesToSnippet: ["text:30"],
        highlightPreTag: HIGHLIGHT_START,
        highlightPostTag: HIGHLIGHT_END,
      },
    });

    return hits.map((hit) => ({
      document: {
        id: hit.objectID,
        title: hit.title,
        section: hit.section,
        href: hit.href,
        text: "",
      },
      score: 0,
      title: parseHighlightedText(readHighlight(hit._highlightResult, "title") ?? hit.title),
      snippet: parseHighlightedText(readHighlight(hit._snippetResult, "text") ?? ""),
    }));
  } catch (error) {
    console.error("Algolia search failed; using the built-in search", error);
    return null;
  }
}

/** Turns Algolia's marked-up string into plain parts, so no HTML is ever injected. */
export const parseHighlightedText = (value: string): HighlightPart[] =>
  value
    .split(new RegExp(`${HIGHLIGHT_START}([^${HIGHLIGHT_END}]*)${HIGHLIGHT_END}`))
    .flatMap((text, index) => (text === "" ? [] : [{ text, isMatch: index % 2 === 1 }]));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHighlight = (result: unknown, attribute: string) => {
  const field = isRecord(result) ? result[attribute] : null;
  const value = isRecord(field) ? field["value"] : null;

  return typeof value === "string" ? value : null;
};
