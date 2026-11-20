import { API_VERSION } from "@bv/schemas/constants";
import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { UNPUBLISHED_FILTER } from "../roles";

const REFRESH_DELAY_MS = 1500;

export default function useDraftCount(types: readonly string[]) {
  const client = useClient({ apiVersion: API_VERSION });
  const [count, setCount] = useState(0);
  const typesKey = types.join(",");

  // Justified. External system synchronization.
  useEffect(() => {
    const params = { types: typesKey.split(",") };
    let latestRequest = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function refresh() {
      const request = ++latestRequest;
      return client
        .fetch<number>(`count(*[${UNPUBLISHED_FILTER}])`, params, { perspective: "drafts" })
        .then(
          (next) => {
            if (request === latestRequest) setCount(next);
          },
          (error: unknown) => console.error("Could not count unpublished changes", error),
        );
    }

    void refresh();
    const subscription = client
      .listen('*[_id in path("drafts.**") && _type in $types]', params, {
        events: ["mutation"],
        visibility: "query",
      })
      .subscribe(() => {
        clearTimeout(timer);
        timer = setTimeout(refresh, REFRESH_DELAY_MS);
      });

    return () => {
      latestRequest += 1;
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [client, typesKey]);

  return count;
}
