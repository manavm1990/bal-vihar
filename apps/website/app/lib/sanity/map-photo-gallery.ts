import { stegaClean } from "@sanity/client/stega";
import { getSanityArrayKey } from "./sanity-array-key";
import type { HomePhotoBoardItem, PhotoGalleryData, SanityImageValue } from "./types";

interface MapPhotoGalleryOptions {
  /** When true, only photos with featured !== false (home board). */
  featuredOnly?: boolean;
}

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

const parseBoolean = (value: unknown): boolean | null => (isBoolean(value) ? value : null);

const parseImage = (value: unknown): SanityImageValue | null =>
  isRecord(value) ? (value as SanityImageValue) : null;

const parseString = (value: unknown): string | null => (isString(value) ? value : null);

const parseStrings = (value: unknown): string[] =>
  Array.isArray(value)
    ? // Stega-clean path tags so banner matching still works in draft preview.
      value.filter(isString).map((entry) => stegaClean(entry))
    : [];

const mapGalleryPhoto = (
  value: unknown,
  index: number,
  featuredOnly: boolean,
): HomePhotoBoardItem | null => {
  if (!isRecord(value)) return null;

  const item = value;
  const title = parseString(item["title"])?.trim();
  if (!title) return null;

  if (featuredOnly && parseBoolean(item["featured"]) === false) return null;

  return {
    image: parseImage(item["image"]),
    key: getSanityArrayKey(item, `photo-${index}`),
    note: parseString(item["note"]),
    pages: parseStrings(item["pages"]),
    schoolYear: parseString(item["schoolYear"]),
    title,
  };
};

/** Normalize photoGallery singleton fetch into domain photo items. */
export const mapPhotoGallery = (
  input: unknown,
  options: MapPhotoGalleryOptions = {},
): PhotoGalleryData | null => {
  const root = isRecord(input) ? input : null;
  if (!root) return null;

  // Accept bare document or defineLive `{ data }`.
  const dataRecord = isRecord(root["data"]) ? root["data"] : root;
  const id = parseString(dataRecord["_id"]) ?? parseString(dataRecord["id"]);
  if (!id) return null;

  const photosRaw = dataRecord["photos"];
  const photos = Array.isArray(photosRaw)
    ? photosRaw
        .map((value, index) => mapGalleryPhoto(value, index, options.featuredOnly === true))
        .filter((item): item is HomePhotoBoardItem => item !== null)
    : [];

  return {
    id,
    photos,
    title: parseString(dataRecord["title"]),
  } as const;
};
