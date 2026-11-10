import { cookies, draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { defineLive, type LivePerspective, resolvePerspectiveFromCookies } from "next-sanity/live";
import { client } from "./client";
import { apiVersion, sanityReadToken } from "./env";

export const SANITY_CONTENT_TAG = "sanity-content"; // * Next cache tag

export interface DynamicFetchOptions {
  perspective: LivePerspective;
  stega: boolean;
}

const draftToken = sanityReadToken ?? false;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: draftToken,
  browserToken: draftToken,
  strict: true,
});

export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) return { perspective: "published", stega: false };

  return {
    perspective: (await resolvePerspectiveFromCookies({ cookies: await cookies() })) ?? "drafts",
    stega: true,
  } as const;
}

export async function sanityFetchStaticParams<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
}) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective: "published",
    stega: false,
    tags: [SANITY_CONTENT_TAG],
  });

  return { data } as const;
}
