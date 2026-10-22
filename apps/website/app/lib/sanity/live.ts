import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { apiVersion, sanityReadToken } from "./env";

const draftToken = sanityReadToken ?? false;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: draftToken,
  browserToken: draftToken,
});
