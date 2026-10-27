import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import type { PHOTO_ALBUM_QUERY_RESULT, PHOTO_ALBUMS_QUERY_RESULT } from "sanity.types";
import { BASE_TITLE, SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";
import { fetchSanityOrNull } from "./fetch";
import { urlFor } from "./image";
import { PHOTO_ALBUM_QUERY, PHOTO_ALBUMS_QUERY } from "./queries";

type AlbumResult = NonNullable<PHOTO_ALBUM_QUERY_RESULT>;
type RawPhoto = NonNullable<AlbumResult["photos"]>[number];
type SummaryResult = PHOTO_ALBUMS_QUERY_RESULT[number];

/** A photo with what a page needs: a description, its own page and a share link. */
export type AlbumPhoto = Omit<RawPhoto, "alt"> & { alt: string; path: string; shareHref: string };

export interface PhotoAlbum extends Omit<AlbumResult, "photos"> {
  description: string;
  path: string;
  photos: AlbumPhoto[];
}

export interface PhotoAlbumSummary extends SummaryResult {
  description: string;
  path: string;
}

interface FetchPhotoAlbumOptions {
  /** Metadata must never carry stega characters, so it opts out. */
  stega?: boolean;
}

// 1.91:1 is the shape link previews are cropped to.
const PREVIEW_SIZE = { width: 1200, height: 630 };

export function createAlbumMetadata(album: PhotoAlbum | null): Metadata {
  const cover = album?.photos[0];
  if (!album || !cover) return {};

  const year = album.schoolYear ? ` (school year ${album.schoolYear})` : "";

  return createMetadata(
    `${album.title} | ${BASE_TITLE}`,
    `Photos from ${album.title} at ${BASE_TITLE}${year}.`,
    album.path,
    cover,
  );
}

export function createPhotoMetadata(album: PhotoAlbum | null, index: number): Metadata {
  const photo = album?.photos[index];
  if (!album || !photo) return {};

  return createMetadata(
    `${album.title}, photo ${index + 1} | ${BASE_TITLE}`,
    photo.caption?.trim() || `Photo ${index + 1} of ${album.photos.length} from ${album.title}.`,
    photo.path,
    photo,
  );
}

/** The school year and how many photos, for cards, subtitles and link previews. */
export const describeAlbum = ({
  schoolYear,
  photoCount,
}: Pick<SummaryResult, "schoolYear" | "photoCount">) =>
  [
    schoolYear ? `School year ${schoolYear}` : null,
    `${photoCount ?? 0} ${photoCount === 1 ? "photo" : "photos"}`,
  ]
    .filter(Boolean)
    .join(" · ");

/** One gallery by its web address, or null if it was removed or has no picture. */
export async function fetchPhotoAlbum(slug: string, options?: FetchPhotoAlbumOptions) {
  const result = await fetchSanityOrNull(PHOTO_ALBUM_QUERY, "the photo gallery", { slug }, options);
  const album = result?.data ? toAlbum(result.data) : null;

  return album && album.photos.length > 0 ? album : null;
}

/** Galleries that have a picture, newest school year first. */
export async function fetchPhotoAlbums() {
  const result = await fetchSanityOrNull(PHOTO_ALBUMS_QUERY, "the photo galleries");

  return (result?.data ?? []).map(toSummary);
}

export function findAlbumPhoto(album: PhotoAlbum | null, key: string) {
  const index = album?.photos.findIndex((photo) => photo._key === key) ?? -1;

  return { index, photo: album?.photos[index] };
}

const createMetadata = (title: string, description: string, path: string, photo: AlbumPhoto) =>
  ({
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: path,
      title,
      description,
      images: [{ url: getPreviewImageUrl(photo), ...PREVIEW_SIZE, alt: photo.alt }],
    },
  }) satisfies Metadata;

/** A WhatsApp message with a link to one photo's page, which previews that picture. */
const createPhotoShareUrl = ({ schoolYear, title }: AlbumResult, path: string) =>
  createWhatsAppShareUrl([
    stegaClean(title),
    schoolYear ? `School year ${stegaClean(schoolYear)}` : null,
    `${SITE_URL}${path}`,
  ]);

const getAlbumPath = (slug: string) => `/photos/${stegaClean(slug)}`;

const getPhotoPath = (slug: string, key: string) => `${getAlbumPath(slug)}/${stegaClean(key)}`;

/** JPEG, cropped to the preview shape and kept small, which chat apps load most reliably. */
const getPreviewImageUrl = (photo: AlbumPhoto) =>
  urlFor(photo)
    .width(PREVIEW_SIZE.width)
    .height(PREVIEW_SIZE.height)
    .fit("crop")
    .format("jpg")
    .quality(75)
    .url();

function toAlbum(album: AlbumResult): PhotoAlbum {
  const photos = (album.photos ?? [])
    .filter((photo) => photo.asset)
    .map((photo, index) => toAlbumPhoto(album, photo, index));

  return {
    ...album,
    description: describeAlbum({ schoolYear: album.schoolYear, photoCount: photos.length }),
    path: getAlbumPath(album.slug),
    photos,
  };
}

/** Photos added in bulk have no description of their own, so they take the gallery's name. */
function toAlbumPhoto(album: AlbumResult, photo: RawPhoto, index: number): AlbumPhoto {
  const path = getPhotoPath(album.slug, photo._key);

  return {
    ...photo,
    alt: photo.alt?.trim() || `${album.title}, photo ${index + 1}`,
    path,
    shareHref: createPhotoShareUrl(album, path),
  };
}

const toSummary = (album: SummaryResult): PhotoAlbumSummary => ({
  ...album,
  description: describeAlbum(album),
  path: getAlbumPath(album.slug),
});
