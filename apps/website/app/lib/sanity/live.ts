import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { apiVersion, sanityReadToken } from "./env";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),

  // defineLive accepts `false` when no draft token is configured (published CDN reads only).
  serverToken: sanityReadToken ?? false,

  // No draft-mode route exists yet; keep the token server-side.
  browserToken: false,
});
