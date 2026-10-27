import { stegaClean } from "@sanity/client/stega";
import type { PHOTO_ALBUM_QUERY_RESULT, PHOTO_ALBUMS_QUERY_RESULT } from "sanity.types";
import { SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";
import { fetchSanityOrNull } from "./fetch";
import { PHOTO_ALBUM_QUERY, PHOTO_ALBUMS_QUERY } from "./queries";

export type PhotoAlbum = NonNullable<PHOTO_ALBUM_QUERY_RESULT>;
export type PhotoAlbumSummary = PHOTO_ALBUMS_QUERY_RESULT[number];
export type AlbumPhoto = PhotoAlbum["photos"][number];

interface FetchPhotoAlbumOptions {
  /** Metadata must never carry stega characters, so it opts out. */
  stega?: boolean;
}

/** Galleries that have a picture, newest school year first. */
export async function fetchPhotoAlbums() {
  const result = await fetchSanityOrNull(PHOTO_ALBUMS_QUERY, "the photo galleries");

  return result?.data ?? [];
}

/** One gallery by its web address, or null if it was removed or has no picture. */
export async function fetchPhotoAlbum(slug: string, options?: FetchPhotoAlbumOptions) {
  const result = await fetchSanityOrNull(PHOTO_ALBUM_QUERY, "the photo gallery", { slug }, options);
  const album = result?.data;

  return album && album.photos.length > 0 ? album : null;
}

/** A WhatsApp message with a link to one photo's page, which previews that picture. */
export const createPhotoShareUrl = (
  { slug, title, schoolYear }: Pick<PhotoAlbum, "slug" | "title" | "schoolYear">,
  photo: Pick<AlbumPhoto, "_key">,
) =>
  createWhatsAppShareUrl([
    stegaClean(title),
    schoolYear ? `School year ${stegaClean(schoolYear)}` : null,
    `${SITE_URL}${getPhotoPath(slug, photo._key)}`,
  ]);

/** The school year and how many photos, for cards, subtitles and link previews. */
export const describeAlbum = ({
  schoolYear,
  photoCount,
}: Pick<PhotoAlbumSummary, "schoolYear" | "photoCount">) =>
  [
    schoolYear ? `School year ${schoolYear}` : null,
    `${photoCount} ${photoCount === 1 ? "photo" : "photos"}`,
  ]
    .filter(Boolean)
    .join(" · ");

export const getAlbumPath = (slug: string) => `/photos/${stegaClean(slug)}`;

/** Photos added in bulk have no description of their own, so they take the gallery's name. */
export const getPhotoAlt = (photo: Pick<AlbumPhoto, "alt">, albumTitle: string, index: number) =>
  photo.alt?.trim() || `${albumTitle}, photo ${index + 1}`;

export const getPhotoPath = (slug: string, key: string) =>
  `${getAlbumPath(slug)}/${stegaClean(key)}`;
