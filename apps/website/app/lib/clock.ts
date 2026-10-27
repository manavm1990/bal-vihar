import { cacheLife } from "next/cache";

/**
 * The time that notices and events are filtered against. A per-request `new Date()` would pull
 * them out of the prerendered shell, so they would pop in after the page loads; a cached clock
 * keeps them in it at the cost of being up to a minute behind.
 */
export async function getCachedNow() {
  "use cache";
  // An `expire` under 5 minutes would make this a request-time read again, so it stays at 5.
  cacheLife({ stale: 300, revalidate: 60, expire: 300 });

  return new Date();
}
