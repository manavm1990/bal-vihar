import { type StegaBranded, stegaClean } from "@sanity/client/stega";
import type { PHOTO_GALLERY_QUERY_RESULT } from "sanity.types";

type Gallery = StegaBranded<PHOTO_GALLERY_QUERY_RESULT>;
export type GalleryPhoto = Omit<RawGalleryPhoto, "pages" | "title"> & {
  pages: string[];
  title: string;
};
type RawGalleryPhoto = NonNullable<NonNullable<Gallery>["photos"]>[number];

interface MapPhotoGalleryOptions {
  featuredOnly?: boolean;
}

export function mapPhotoGallery(
  gallery: Gallery | undefined,
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
