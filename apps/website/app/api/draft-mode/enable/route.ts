import { client } from "@lib/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

// Token is read at request time via env; enable fails closed if unset.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env["SANITY_API_READ_TOKEN"] }),
});
