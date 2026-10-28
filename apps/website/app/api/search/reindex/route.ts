import { timingSafeEqual } from "node:crypto";
import { client } from "@lib/sanity/client";
import {
  CALENDAR_EVENTS_QUERY,
  CLASS_PAGES_QUERY,
  FAQS_QUERY,
  PHOTO_ALBUMS_QUERY,
  POLICIES_QUERY,
} from "@lib/sanity/queries";
import { crawlPageDocuments } from "@lib/search/crawl-pages";
import { createAlgoliaRecords } from "@lib/search/index-records";
import { createSanitySearchDocuments } from "@lib/search/sanity-documents";
import { STATIC_SEARCH_DOCUMENTS } from "@lib/search/static-documents";
import { SYNONYMS } from "@lib/search/synonyms";
import { algoliasearch } from "algoliasearch";
import { after } from "next/server";

export const maxDuration = 60;

export const POST = async (request: Request) => {
  const secret = process.env["SEARCH_REINDEX_SECRET"];
  if (!secret || !isAuthorized(request, secret))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const appId = process.env["ALGOLIA_APP_ID"];
  const indexName = process.env["ALGOLIA_INDEX_NAME"];
  const writeKey = process.env["ALGOLIA_WRITE_KEY"];

  if (!appId || !writeKey || !indexName)
    return Response.json({ error: "Algolia is not configured" }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const config = {
    appId,
    writeKey,
    indexName,
    configure: searchParams.get("configure") === "true",
    origin: new URL(request.url).origin,
  } as const;

  if (searchParams.get("wait") === "true")
    try {
      return Response.json({ indexed: await rebuildIndex(config) });
    } catch (error) {
      reportFailure(error);

      return Response.json(
        { error: error instanceof Error ? error.message : "Unknown error" },
        { status: 500 },
      );
    }

  after(() => rebuildIndex(config).catch(reportFailure));

  return Response.json({ started: true }, { status: 202 });
};

interface AlgoliaConfig {
  appId: string;
  writeKey: string;
  indexName: string;
  configure: boolean;
  origin: string;
}

async function rebuildIndex({ appId, writeKey, indexName, configure, origin }: AlgoliaConfig) {
  const records = createAlgoliaRecords(await collectSearchDocuments(origin));

  if (!records.length) throw new Error("Refusing to reindex: no search documents were built");

  const algolia = algoliasearch(appId, writeKey);
  if (configure) await configureIndex(algolia, indexName);

  await algolia.replaceAllObjects({
    indexName,
    objects: records,
    batchSize: 500,
  });

  return records.length;
}

async function collectSearchDocuments(origin: string) {
  const sanity = client.withConfig({ useCdn: false });
  const [events, classes, faqs, albums, policies, crawled] = await Promise.all([
    sanity.fetch(CALENDAR_EVENTS_QUERY),
    sanity.fetch(CLASS_PAGES_QUERY),
    sanity.fetch(FAQS_QUERY),
    sanity.fetch(PHOTO_ALBUMS_QUERY),
    sanity.fetch(POLICIES_QUERY),
    crawlPageDocuments(origin),
  ]);

  return [
    ...STATIC_SEARCH_DOCUMENTS,
    ...crawled,
    ...createSanitySearchDocuments({ events, classes, faqs, albums, policies }),
  ] as const;
}

async function configureIndex(algolia: ReturnType<typeof algoliasearch>, indexName: string) {
  const settings = await algolia.setSettings({
    indexName,
    indexSettings: {
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
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      highlightPreTag: "⟦",
      highlightPostTag: "⟧",
      snippetEllipsisText: "…",
      ranking: ["typo", "words", "filters", "proximity", "attribute", "exact", "custom"],
    },
  });
  await algolia.waitForTask({ indexName, taskID: settings.taskID });

  const synonyms = await algolia.saveSynonyms({
    indexName,
    synonymHit: SYNONYMS,
    replaceExistingSynonyms: true,
  });
  await algolia.waitForTask({ indexName, taskID: synonyms.taskID });
}

function isAuthorized(request: Request, secret: string) {
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);

  return given.length === expected.length && timingSafeEqual(given, expected);
}

const reportFailure = (error: unknown) => {
  console.error("Could not rebuild the search index", error);
};
