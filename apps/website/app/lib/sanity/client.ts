import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    // defineLive enables stega only while draft mode is on.
    enabled: false,
    // Hosted Studio URL in production; set NEXT_PUBLIC_SANITY_STUDIO_URL in env.
    studioUrl: process.env["NEXT_PUBLIC_SANITY_STUDIO_URL"],
  },
});
