import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "./env";
import type { SanityImageValue } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageValue) => builder.image(source);
