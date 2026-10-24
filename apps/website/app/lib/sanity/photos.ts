import { SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";
import { fetchSanityData } from "./fetch";
import { mapPhotoGallery } from "./map-photo-gallery";
import { PHOTO_GALLERY_QUERY } from "./queries";
import type { HomePhotoBoardItem } from "./types";

interface FetchPhotoOptions {
  /** Metadata must never carry stega characters, so it opts out. */
  stega?: boolean;
}

/** The gallery's photos that have a picture, in the order editors set in Studio. */
export async function fetchPhotos(options?: FetchPhotoOptions) {
  const gallery = mapPhotoGallery(await fetchSanityData(PHOTO_GALLERY_QUERY, options), {
    featuredOnly: false,
  });

  return (gallery?.photos ?? []).filter((photo) => photo.image?.asset);
}

/** One photo by its Studio key, or null if it was removed or has no picture. */
export async function fetchPhoto(key: string, options?: FetchPhotoOptions) {
  return (await fetchPhotos(options)).find((photo) => photo.key === key) ?? null;
}

export const createPhotoShareUrl = (photo: HomePhotoBoardItem) =>
  createWhatsAppShareUrl([photo.title, describePhoto(photo), `${SITE_URL}/photos/${photo.key}`]);

/** The school year and note, for captions and link previews. */
export const describePhoto = ({ schoolYear, note }: HomePhotoBoardItem) =>
  [schoolYear ? `School year ${schoolYear}` : null, note?.trim()].filter(Boolean).join(" · ");
