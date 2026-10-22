import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "./env";
import type { SanityImageValue } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageValue) {
  // Image builder accepts our Sanity image object shape (asset/hotspot/crop).
  return builder.image(source);
}
