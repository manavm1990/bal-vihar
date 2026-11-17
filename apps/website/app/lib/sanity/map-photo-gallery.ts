import { stegaClean } from "@sanity/client/stega";
import type { PHOTO_GALLERY_QUERY_RESULT } from "sanity.types";

export type GalleryPhoto = Omit<RawGalleryPhoto, "pages"> & { pages: string[] };
type RawGalleryPhoto = NonNullable<NonNullable<PHOTO_GALLERY_QUERY_RESULT>["photos"]>[number];

interface MapPhotoGalleryOptions {
  featuredOnly?: boolean;
}

export function mapPhotoGallery(
  gallery: PHOTO_GALLERY_QUERY_RESULT | null | undefined,
  { featuredOnly = false }: MapPhotoGalleryOptions = {},
): GalleryPhoto[] {
  const photos: RawGalleryPhoto[] = gallery?.photos ?? [];

  return photos.flatMap((photo) => {
    const title = photo.title?.trim();

    return !title || (featuredOnly && photo.featured === false)
      ? []
      : [{ ...photo, title, pages: (photo.pages ?? []).map((page) => stegaClean(page)) }];
  });
}
