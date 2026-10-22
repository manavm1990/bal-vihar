import { sanityFetch } from "./live";

/**
 * defineLive's sanityFetch returns `{ data }`.
 * Until TypeGen is wired, unwrap
 * safely without scattering casts across pages.
 */
export async function fetchSanityData(query: string): Promise<unknown> {
  try {
    const result = await sanityFetch({ query });
    if (typeof result !== "object" || result === null) return null;

    // defineLive result shape is { data: T }; read without relying on generated types.
    const record = result as Record<string, unknown>;
    return "data" in record ? record["data"] : result;
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}
