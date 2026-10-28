import { algoliasearch } from "algoliasearch";
import { connection } from "next/server";
import type { HighlightPart, SearchResult } from "./search";

interface AlgoliaRecord {
  title: string;
  section: string;
  href: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHighlight = (result: unknown, attribute: string) => {
  const field = isRecord(result) ? result[attribute] : null;
  const value = isRecord(field) ? field["value"] : null;

  return typeof value === "string" ? value : null;
};

export async function searchAlgolia(query: string, limit: number): Promise<SearchResult[]> {
  await connection();

  const appId = process.env["ALGOLIA_APP_ID"];
  const searchKey = process.env["ALGOLIA_SEARCH_KEY"];
  const indexName = process.env["ALGOLIA_INDEX_NAME"];
  if (!appId || !searchKey || !indexName) return [];

  try {
    const { hits } = await algoliasearch(appId, searchKey).searchSingleIndex<AlgoliaRecord>({
      indexName,
      searchParams: {
        attributesToRetrieve: ["title", "section", "href"],
        attributesToHighlight: ["title"],
        attributesToSnippet: ["text:40"],
        highlightPreTag: "⟦",
        highlightPostTag: "⟧",
        responseFields: ["hits"],
        query,
        hitsPerPage: limit,
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
    console.error("Algolia search failed", error);
    return [];
  }
}

export const parseHighlightedText = (value: string): HighlightPart[] =>
  value
    .split(/⟦([^⟧]*)⟧/)
    .flatMap((text, index) => (text === "" ? [] : [{ text, isMatch: index % 2 === 1 }]));
