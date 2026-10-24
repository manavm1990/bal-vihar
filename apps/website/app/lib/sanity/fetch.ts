import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";

import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  SANITY_CONTENT_TAG,
  sanityFetch,
} from "./live";

interface FetchOptions {
  /** Metadata must never carry stega characters, so it opts out. */
  stega?: boolean;
}

const PUBLISHED: DynamicFetchOptions = { perspective: "published", stega: false };

/**
 * Fetches a page's query; a failed fetch is logged and gives null so the page can show its empty
 * state.
 */
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

/**
 * defineLive's sanityFetch returns `{ data }`.
 * Until TypeGen is wired, unwrap
 * safely without scattering casts across pages.
 */
export async function fetchSanityData(query: string, options: FetchOptions = {}): Promise<unknown> {
  try {
    const result = await fetchSanityResult(query, {}, options);
    if (typeof result !== "object" || result === null) return null;

    // defineLive result shape is { data: T }; read without relying on generated types.
    const record = result as Record<string, unknown>;
    return "data" in record ? record["data"] : result;
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}

/**
 * Outside draft mode the options are constants, so a prerendered page never waits on a request.
 * In draft mode they come from the request, and only then.
 */
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

  return { data };
}
