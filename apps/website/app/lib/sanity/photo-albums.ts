import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import type { PHOTO_ALBUM_QUERY_RESULT, PHOTO_ALBUMS_QUERY_RESULT } from "sanity.types";
import { BASE_TITLE, SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";
import { fetchSanityOrNull } from "./fetch";
import { urlFor } from "./image";
import { PHOTO_ALBUM_QUERY, PHOTO_ALBUMS_QUERY } from "./queries";

type AlbumResult = WithSchoolYear<NonNullable<PHOTO_ALBUM_QUERY_RESULT>>;
type RawPhoto = NonNullable<AlbumResult["photos"]>[number];
type SummaryResult = WithSchoolYear<PHOTO_ALBUMS_QUERY_RESULT[number]>;
type WithSchoolYear<T> = Omit<T, "schoolYear"> & { schoolYear: string };

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
  stega?: boolean;
}

const LINK_PREVIEW_SIZE = { width: 1200, height: 630 };

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

export const describeAlbum = ({
  schoolYear,
  photoCount,
}: {
  schoolYear: string | null;
  photoCount: number | null;
}) =>
  [
    schoolYear ? `School year ${schoolYear}` : null,
    `${photoCount ?? 0} ${photoCount === 1 ? "photo" : "photos"}`,
  ]
    .filter(Boolean)
    .join(" · ");

export async function fetchPhotoAlbum(slug: string, options?: FetchPhotoAlbumOptions) {
  const result = await fetchSanityOrNull(PHOTO_ALBUM_QUERY, "the photo gallery", { slug }, options);
  const album = result?.data ? createAlbum(result.data) : null;

  return album && album.photos.length > 0 ? album : null;
}

export async function fetchPhotoAlbums() {
  const result = await fetchSanityOrNull(PHOTO_ALBUMS_QUERY, "the photo galleries");

  return (result?.data ?? []).map(createAlbumSummary);
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
      images: [{ url: getLinkPreviewImageUrl(photo), ...LINK_PREVIEW_SIZE, alt: photo.alt }],
    },
  }) satisfies Metadata;

const createPhotoWhatsAppShareUrl = ({ schoolYear, title }: AlbumResult, path: string) =>
  createWhatsAppShareUrl([
    stegaClean(title),
    schoolYear ? `School year ${stegaClean(schoolYear)}` : null,
    `${SITE_URL}${path}`,
  ]);

const getAlbumPath = (slug: string) => `/photos/${stegaClean(slug)}`;

const getPhotoPath = (slug: string, key: string) => `${getAlbumPath(slug)}/${stegaClean(key)}`;

const getLinkPreviewImageUrl = (photo: AlbumPhoto) =>
  urlFor(photo)
    .width(LINK_PREVIEW_SIZE.width)
    .height(LINK_PREVIEW_SIZE.height)
    .fit("crop")
    .format("jpg")
    .quality(75)
    .url();

function createAlbum(album: AlbumResult): PhotoAlbum {
  const photos = (album.photos ?? [])
    .filter((photo) => photo.asset)
    .map((photo, index) => createAlbumPhoto(album, photo, index));

  return {
    ...album,
    description: describeAlbum({ schoolYear: album.schoolYear, photoCount: photos.length }),
    path: getAlbumPath(album.slug),
    photos,
  };
}

function createAlbumPhoto(album: AlbumResult, photo: RawPhoto, index: number): AlbumPhoto {
  const path = getPhotoPath(album.slug, photo._key);

  return {
    ...photo,
    alt: photo.alt?.trim() || `${album.title}, photo ${index + 1}`,
    path,
    shareHref: createPhotoWhatsAppShareUrl(album, path),
  };
}

const createAlbumSummary = (album: SummaryResult): PhotoAlbumSummary => ({
  ...album,
  description: describeAlbum(album),
  path: getAlbumPath(album.slug),
});
