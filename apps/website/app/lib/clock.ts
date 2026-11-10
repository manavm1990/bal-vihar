import { cacheLife } from "next/cache";

const CLIENT_MAX_STALE_SECONDS = 300;
const SERVER_BACKGROUND_REVALIDATE_INTERVAL_SECONDS = 60;
const SERVER_HARD_EXPIRE_SECONDS = 300;

export async function getCachedNow() {
  "use cache";
  cacheLife({
    stale: CLIENT_MAX_STALE_SECONDS,
    revalidate: SERVER_BACKGROUND_REVALIDATE_INTERVAL_SECONDS,
    expire: SERVER_HARD_EXPIRE_SECONDS,
  });

  return new Date();
}
