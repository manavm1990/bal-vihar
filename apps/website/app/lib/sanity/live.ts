import { cookies, draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { defineLive, type LivePerspective, resolvePerspectiveFromCookies } from "next-sanity/live";

import { client } from "./client";
import { apiVersion, sanityReadToken } from "./env";

export interface DynamicFetchOptions {
  perspective: LivePerspective;
  stega: boolean;
}

/** On every cached Sanity fetch, so a publish webhook can expire them all without a visitor online. */
export const SANITY_CONTENT_TAG = "sanity-content";

const draftToken = sanityReadToken ?? false;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: draftToken,
  browserToken: draftToken,
  // Requires `perspective`/`stega` on every sanityFetch and `includeDrafts` on <SanityLive />,
  // because `draftMode()` and `cookies()` can't be read inside `'use cache'`.
  strict: true,
});

/** Request-time fetch options. Call outside `'use cache'` and pass the result in as props. */
export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) return { perspective: "published", stega: false };

  const perspective = await resolvePerspectiveFromCookies({ cookies: await cookies() });

  return { perspective: perspective ?? "drafts", stega: true };
}

/** For `generateStaticParams`, which always reads published content. */
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

  return { data };
}
