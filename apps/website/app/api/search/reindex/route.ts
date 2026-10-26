import { timingSafeEqual } from "node:crypto";
import { client } from "@lib/sanity/client";
import {
  CALENDAR_EVENTS_QUERY,
  CLASS_PAGES_QUERY,
  FAQS_QUERY,
  PHOTO_GALLERY_QUERY,
  POLICIES_QUERY,
} from "@lib/sanity/queries";
import { ALGOLIA_INDEX_SETTINGS } from "@lib/search/algolia-config";
import { crawlPageDocuments } from "@lib/search/crawl-pages";
import { createAlgoliaRecords, INDEX_BATCH_SIZE } from "@lib/search/index-records";
import { createSanitySearchDocuments } from "@lib/search/sanity-documents";
import { STATIC_SEARCH_DOCUMENTS } from "@lib/search/static-documents";
import { SYNONYMS } from "@lib/search/synonyms";
import { algoliasearch } from "algoliasearch";
import { after } from "next/server";

// The rebuild runs after the response, and the host must keep the function alive until it ends.
export const maxDuration = 60;

/**
 * Rebuilds the whole Algolia index from the site's pages and Sanity content. Call it with
 * `Authorization: Bearer $SEARCH_REINDEX_SECRET` after a deploy and from a Sanity webhook.
 *
 * Options: `?wait=true` runs inline and returns the result or the error. `?configure=true` also
 * sends the index settings and synonyms, which Algolia is slow to apply, so only use it after
 * changing them (including after moving onto the Open Source plan).
 */
export const POST = async (request: Request) => {
  const secret = process.env["SEARCH_REINDEX_SECRET"];
  if (!secret || !isAuthorized(request, secret))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const appId = process.env["ALGOLIA_APP_ID"];
  const writeKey = process.env["ALGOLIA_WRITE_KEY"];
  const indexName = process.env["ALGOLIA_INDEX_NAME"];
  if (!appId || !writeKey || !indexName)
    return Response.json({ error: "Algolia is not configured" }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const config = {
    appId,
    writeKey,
    indexName,
    configure: searchParams.get("configure") === "true",
    origin: new URL(request.url).origin,
  };

  // `?wait=true` runs the rebuild inline, so a failure shows up in the response (handy with curl).
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

  // The rebuild takes about 30 seconds, longer than a webhook will wait, so answer straight away.
  after(() => rebuildIndex(config).catch(reportFailure));

  return Response.json({ started: true }, { status: 202 });
};

interface AlgoliaConfig {
  appId: string;
  writeKey: string;
  indexName: string;
  configure: boolean;
  /** This site's own address, so pages can be read for search. */
  origin: string;
}

async function rebuildIndex({ appId, writeKey, indexName, configure, origin }: AlgoliaConfig) {
  const records = createAlgoliaRecords(await collectSearchDocuments(origin));
  // Never push an empty set — replaceAllObjects would wipe the live index.
  if (records.length === 0) throw new Error("Refusing to reindex: no search documents were built");

  const algolia = algoliasearch(appId, writeKey);
  if (configure) await configureIndex(algolia, indexName);

  // replaceAllObjects builds a temporary index that inherits the current settings and synonyms.
  await algolia.replaceAllObjects({
    indexName,
    // SDK types records as open maps; ours are fixed-shape Algolia objects.
    objects: records as Array<Record<string, unknown>>,
    batchSize: INDEX_BATCH_SIZE,
  });

  return records.length;
}

/** Sanity content and crawled pages load together so the serverless reindex stays under maxDuration. */
async function collectSearchDocuments(origin: string) {
  // Straight from Sanity rather than the cached helper, so an edit is never one step behind.
  const [events, classes, faqs, gallery, policies, crawled] = await Promise.all([
    client.fetch(CALENDAR_EVENTS_QUERY),
    client.fetch(CLASS_PAGES_QUERY),
    client.fetch(FAQS_QUERY),
    client.fetch(PHOTO_GALLERY_QUERY),
    client.fetch(POLICIES_QUERY),
    crawlPageDocuments(origin),
  ]);

  return [
    ...STATIC_SEARCH_DOCUMENTS,
    ...crawled,
    ...createSanitySearchDocuments({ events, classes, faqs, gallery, policies }),
  ];
}

async function configureIndex(algolia: ReturnType<typeof algoliasearch>, indexName: string) {
  const settings = await algolia.setSettings({
    indexName,
    indexSettings: { ...ALGOLIA_INDEX_SETTINGS },
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
