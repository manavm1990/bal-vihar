import { createImageUrlBuilder } from "@sanity/image-url";
import type { PAGE_QUERY_RESULT, PHOTO_ALBUM_QUERY_RESULT } from "sanity.types";
import { dataset, projectId } from "./env";
import type { GalleryPhoto } from "./map-photo-gallery";

export type SanityImageValue =
  | NonNullable<GalleryPhoto["image"]>
  | NonNullable<NonNullable<PHOTO_ALBUM_QUERY_RESULT>["photos"]>[number]
  | Extract<NonNullable<PAGE_QUERY_RESULT>["body"][number], { _type: "mediaImage" }>;

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageValue) => builder.image(source);
