import { timingSafeEqual } from "node:crypto";
import { client } from "@lib/sanity/client";
import { CALENDAR_EVENTS_QUERY, CLASS_PAGES_QUERY, POLICIES_QUERY } from "@lib/sanity/queries";
import { createSanitySearchDocuments } from "@lib/search/sanity-documents";
import type { SearchDocument } from "@lib/search/search";
import { STATIC_SEARCH_DOCUMENTS } from "@lib/search/static-documents";
import { SYNONYMS } from "@lib/search/synonyms";
import { algoliasearch } from "algoliasearch";
import { after } from "next/server";

// The rebuild runs after the response, and the host must keep the function alive until it ends.
export const maxDuration = 60;

// Algolia rejects records over 10 KB, so stay well under it.
const MAX_RECORD_BYTES = 9000;
const MAX_TEXT_LENGTH = 6000;

/**
 * Rebuilds the whole Algolia index from the site's pages and Sanity content. Call it with
 * `Authorization: Bearer $SEARCH_REINDEX_SECRET` after a deploy and from a Sanity webhook.
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

  // The rebuild takes about 30 seconds, longer than a webhook will wait, so answer straight away.
  after(() =>
    rebuildIndex({ appId, writeKey, indexName }).catch((error: unknown) => {
      console.error("Could not rebuild the search index", error);
    }),
  );

  return Response.json({ started: true }, { status: 202 });
};

interface AlgoliaConfig {
  appId: string;
  writeKey: string;
  indexName: string;
}

async function rebuildIndex({ appId, writeKey, indexName }: AlgoliaConfig) {
  // Straight from Sanity rather than the cached helper, so an edit is never one step behind.
  const [events, classes, policies] = await Promise.all([
    client.fetch(CALENDAR_EVENTS_QUERY),
    client.fetch(CLASS_PAGES_QUERY),
    client.fetch(POLICIES_QUERY),
  ]);
  const records = [
    ...STATIC_SEARCH_DOCUMENTS,
    ...createSanitySearchDocuments({ events, classes, policies }),
  ].map(createRecord);

  const algolia = algoliasearch(appId, writeKey);
  // Settings and synonyms go in first: replaceAllObjects copies them onto the new index.
  const settings = await algolia.setSettings({
    indexName,
    indexSettings: {
      // Position inside a title doesn't matter, and a title match outranks the section and body.
      searchableAttributes: ["unordered(title)", "section", "text"],
      attributesToRetrieve: ["title", "section", "href"],
      attributesToHighlight: ["title"],
      attributesToSnippet: ["text:30"],
      customRanking: ["desc(boost)"],
    },
  });
  await algolia.waitForTask({ indexName, taskID: settings.taskID });
  const synonyms = await algolia.saveSynonyms({
    indexName,
    synonymHit: SYNONYMS,
    replaceExistingSynonyms: true,
  });
  await algolia.waitForTask({ indexName, taskID: synonyms.taskID });

  await algolia.replaceAllObjects({ indexName, objects: records });
}

function createRecord(document: SearchDocument) {
  let text = document.text.slice(0, MAX_TEXT_LENGTH);
  let record = toRecord(document, text);

  while (Buffer.byteLength(JSON.stringify(record)) > MAX_RECORD_BYTES) {
    text = text.slice(0, Math.floor(text.length * 0.9));
    record = toRecord(document, text);
  }

  return record;
}

function isAuthorized(request: Request, secret: string) {
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);

  return given.length === expected.length && timingSafeEqual(given, expected);
}

const toRecord = (document: SearchDocument, text: string) => ({
  objectID: document.id,
  title: document.title,
  section: document.section,
  href: document.href,
  text,
  boost: document.boost ?? 0,
});
