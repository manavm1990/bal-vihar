import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  SANITY_CONTENT_TAG,
  sanityFetch,
} from "./live";

interface FetchOptions {
  stega?: boolean;
}

const PUBLISHED: DynamicFetchOptions = { perspective: "published", stega: false };

export const fetchSanityOrNull = <const QueryString extends string>(
  query: QueryString,
  label: string,
  params: QueryParams = {},
  options: FetchOptions = {},
) =>
  fetchSanityResult(query, params, options).catch((error: unknown) => {
    console.error(`Could not load ${label}`, error);
    return null;
  });

export async function fetchSanityData(query: string, options: FetchOptions = {}): Promise<unknown> {
  try {
    const result = await fetchSanityResult(query, {}, options);
    if (typeof result !== "object" || result === null) return null;

    return "data" in result ? result.data : result;
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}

async function fetchSanityResult<const QueryString extends string>(
  query: QueryString,
  params: QueryParams = {},
  { stega = true }: FetchOptions = {},
) {
  const { isEnabled: isDraftMode } = await draftMode();
  const dynamic = isDraftMode ? await getDynamicFetchOptions() : PUBLISHED;

  return fetchCachedSanity(query, params, { ...dynamic, stega: dynamic.stega && stega });
}

async function fetchCachedSanity<const QueryString extends string>(
  query: QueryString,
  params: QueryParams,
  options: DynamicFetchOptions,
) {
  "use cache";

  const { data } = await sanityFetch({ query, params, tags: [SANITY_CONTENT_TAG], ...options });

  return { data } as const;
}
