import { createClient, isHttpError, type SanityClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";

interface PhotoAlbumEvent {
  _id: string;
  _rev: string;
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

class PhotoError extends Error {}

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_LINKS = 40;

export const handler = documentEventHandler<PhotoAlbumEvent>(async ({ context, event }) => {
  const { _id, _rev, pasteLinks } = event.data;
  const client = createClient({
    ...context.clientOptions,
    apiVersion: "2025-05-08",
    useCdn: false,
  });
  const isDryRun = context.local === true;

  const { links, rejected } = parseLinks(pasteLinks ?? "");
  const outcomes = await importLinks(client, links, isDryRun);
  const added = outcomes.filter(isAdded);
  const failed = [...rejected, ...outcomes.filter(isFailed)];
  const importReport = createReport(added.length, failed);

  console.info(importReport);
  if (isDryRun) return;

  const patch = client.patch(_id).ifRevisionId(_rev).unset(["pasteLinks"]).set({ importReport });
  await (added.length === 0
    ? patch
    : patch.setIfMissing({ photos: [] }).append("photos", added.map(toAlbumPhoto))
  ).commit();
});

const createReport = (addedCount: number, failed: Failed[]) =>
  [
    `${formatNow()}: ${addedCount} ${addedCount === 1 ? "photo" : "photos"} added${
      failed.length > 0 ? `, ${failed.length} skipped` : ""
    }.`,
    ...failed.map(({ link, reason }) => `Skipped ${link}: ${reason}.`),
  ].join("\n");

function describeError(error: unknown) {
  if (error instanceof PhotoError) return error.message;
  if (error instanceof Error && error.name === "TimeoutError")
    return "the site took too long to answer";
  if (isHttpError(error)) return `Sanity would not save it (${error.message})`;

  return "it could not be downloaded";
}

async function downloadPhoto(link: string) {
  const response = await fetch(link, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new PhotoError(`the site answered ${response.status}`);

  const header = response.headers.get("content-type") ?? "";
  const type = header.split(";")[0]?.trim().toLowerCase() ?? "";
  if (!type.startsWith("image/")) throw new PhotoError("it is a web page, not a picture");

  return { photo: await readPhoto(response, type), type };
}

const formatNow = () =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date());

const getFilename = (link: string) =>
  decodeURIComponent(new URL(link).pathname.split("/").filter(Boolean).pop() ?? "") || "photo";

async function importLink(client: SanityClient, link: string, isDryRun: boolean): Promise<Outcome> {
  try {
    const { photo, type } = await downloadPhoto(link);
    if (isDryRun) return { link, assetId: "dry-run" };

    const asset = await client.assets.upload("image", photo, {
      filename: getFilename(link),
      contentType: type,
    });

    return { link, assetId: asset._id };
  } catch (error) {
    console.error(`Could not import ${link}`, error);

    return { link, reason: describeError(error) };
  }
}

async function importLinks(client: SanityClient, links: string[], isDryRun: boolean) {
  const outcomes: Outcome[] = [];
  const queue = links.entries();
  const work = async () => {
    for (const [index, link] of queue) outcomes[index] = await importLink(client, link, isDryRun);
  };

  await Promise.all(Array.from({ length: 4 }, work));

  return outcomes;
}

const isAdded = (outcome: Outcome): outcome is Added => "assetId" in outcome;

const isFailed = (outcome: Outcome): outcome is Failed => "reason" in outcome;

function isWebLink(value: string) {
  if (!URL.canParse(value)) return false;

  const { protocol } = new URL(value);

  return protocol === "http:" || protocol === "https:";
}

function parseLinks(text: string) {
  const rejected: Failed[] = [];
  const links: string[] = [];
  const lines = new Set(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );

  for (const line of lines) {
    const words = line.split(/\s+/);

    for (const link of words.every((word) => URL.canParse(word)) ? words : [line]) {
      if (!isWebLink(link)) rejected.push({ link, reason: "it is not a web link" });
      else if (links.length < MAX_LINKS) links.push(link);
      else
        rejected.push({
          link,
          reason: `only the first ${MAX_LINKS} links are imported at once`,
        });
    }
  }

  return { links, rejected } as const;
}

async function readPhoto(response: Response, type: string) {
  if (Number(response.headers.get("content-length")) > MAX_BYTES)
    throw new PhotoError("the picture is over 20 MB");

  const reader = response.body?.getReader();
  if (!reader) throw new PhotoError("the site sent no picture");

  const chunks: BlobPart[] = [];
  let size = 0;

  for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
    size += chunk.value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      throw new PhotoError("the picture is over 20 MB");
    }
    chunks.push(chunk.value);
  }

  return new Blob(chunks, { type });
}

const toAlbumPhoto = ({ assetId }: Added) => ({
  _type: "albumPhoto",
  _key: crypto.randomUUID().slice(0, 12),
  asset: { _type: "reference", _ref: assetId },
});
