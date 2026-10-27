import { createClient, type SanityClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";

interface PhotoAlbumEvent {
  _id: string;
  pasteLinks?: string | null;
}

interface Added {
  link: string;
  assetId: string;
}

interface Failed {
  link: string;
  reason: string;
}

type Outcome = Added | Failed;

const API_VERSION = "2025-05-08";
const BATCH_SIZE = 4;
const FETCH_TIMEOUT_MS = 20_000;
const MAX_BYTES = 20 * 1024 * 1024;
const MAX_LINKS = 40;
const PRIVATE_HOST =
  /^(localhost$|.*\.(local|internal)$|127\.|10\.|0\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[(::1|f[cd][0-9a-f]{2}:))/i;

export const handler = documentEventHandler<PhotoAlbumEvent>(async ({ context, event }) => {
  const { _id, pasteLinks } = event.data;
  const client = createClient({ ...context.clientOptions, apiVersion: API_VERSION, useCdn: false });
  const isDryRun = context.local === true;

  const { links, rejected } = parseLinks(pasteLinks ?? "");
  const outcomes = await importLinks(client, links, isDryRun);
  const added = outcomes.filter(isAdded);
  const failed = [...rejected, ...outcomes.filter(isFailed)];
  const importReport = createReport(added.length, failed);

  console.log(importReport);
  if (isDryRun) return;

  const patch = client.patch(_id).unset(["pasteLinks"]).set({ importReport });
  await (added.length === 0
    ? patch
    : patch.setIfMissing({ photos: [] }).append("photos", added.map(toAlbumPhoto))
  ).commit();
});

async function importLink(client: SanityClient, link: string, isDryRun: boolean): Promise<Outcome> {
  try {
    const response = await fetch(link, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) return { link, reason: `the site answered ${response.status}` };

    const type = response.headers.get("content-type") ?? "";
    if (!type.toLowerCase().startsWith("image/"))
      return { link, reason: "it is a web page, not a picture" };

    const photo = await response.blob();
    if (photo.size > MAX_BYTES) return { link, reason: "the picture is over 20 MB" };
    if (isDryRun) return { link, assetId: "dry-run" };

    const asset = await client.assets.upload("image", photo, {
      filename: getFilename(link),
      contentType: type.split(";")[0] ?? type,
    });

    return { link, assetId: asset._id };
  } catch (error) {
    return { link, reason: describeError(error) };
  }
}

/** Fetches a few links at a time, so a long list is quick without flooding the sites. */
async function importLinks(client: SanityClient, links: string[], isDryRun: boolean) {
  const outcomes: Outcome[] = [];

  for (let start = 0; start < links.length; start += BATCH_SIZE)
    outcomes.push(
      ...(await Promise.all(
        links.slice(start, start + BATCH_SIZE).map((link) => importLink(client, link, isDryRun)),
      )),
    );

  return outcomes;
}

/** One link per line, but any whitespace works. Anything that isn't a public web link is reported. */
function parseLinks(text: string) {
  const rejected: Failed[] = [];
  const links: string[] = [];

  for (const token of new Set(text.split(/\s+/).filter(Boolean))) {
    if (!isPublicWebLink(token))
      rejected.push({ link: token, reason: "it is not a public web link" });
    else if (links.length < MAX_LINKS) links.push(token);
    else
      rejected.push({
        link: token,
        reason: `only the first ${MAX_LINKS} links are imported at once`,
      });
  }

  return { links, rejected };
}

const createReport = (addedCount: number, failed: Failed[]) =>
  [
    `${formatNow()}: ${addedCount} ${addedCount === 1 ? "photo" : "photos"} added${
      failed.length > 0 ? `, ${failed.length} skipped` : ""
    }.`,
    ...failed.map(({ link, reason }) => `Skipped ${link}: ${reason}.`),
  ].join("\n");

const describeError = (error: unknown) =>
  error instanceof Error && error.name === "TimeoutError"
    ? "the site took too long to answer"
    : "it could not be downloaded";

const formatNow = () =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date());

const getFilename = (link: string) =>
  decodeURIComponent(new URL(link).pathname.split("/").filter(Boolean).pop() ?? "") || "photo";

const isAdded = (outcome: Outcome): outcome is Added => "assetId" in outcome;

const isFailed = (outcome: Outcome): outcome is Failed => "reason" in outcome;

const isPublicWebLink = (value: string) => {
  if (!URL.canParse(value)) return false;

  const { protocol, hostname } = new URL(value);

  return (protocol === "https:" || protocol === "http:") && !PRIVATE_HOST.test(hostname);
};

const toAlbumPhoto = ({ assetId }: Added) => ({
  _type: "albumPhoto",
  _key: crypto.randomUUID().slice(0, 12),
  asset: { _type: "reference", _ref: assetId },
});
