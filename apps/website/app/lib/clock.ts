import { cacheLife } from "next/cache";

// Seconds the client may serve the cached value without revalidating.
const CLOCK_CACHE_STALE_SECONDS = 300;

/*
 * Seconds after which the server regenerates the cached value in the
 * background.
 */
const CLOCK_CACHE_REVALIDATE_SECONDS = 60;

// Seconds after which the cached value must no longer be served.
const CLOCK_CACHE_EXPIRE_SECONDS = 300;

export async function getCachedNow() {
  "use cache";
  cacheLife({
    stale: CLOCK_CACHE_STALE_SECONDS,
    revalidate: CLOCK_CACHE_REVALIDATE_SECONDS,
    expire: CLOCK_CACHE_EXPIRE_SECONDS,
  });

  return new Date();
}
