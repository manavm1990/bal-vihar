import { API_VERSION } from "@bv/schemas/constants";
import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { UNPUBLISHED_FILTER } from "../roles";

const REFRESH_DELAY_MS = 1500;

export default function useDraftCount(types: string[]) {
  const client = useClient({ apiVersion: API_VERSION });
  const [count, setCount] = useState(0);
  const typesKey = types.join(",");

  // Subscribes to Sanity so the count stays right while edits are made and published elsewhere.
  useEffect(() => {
    const params = { types: typesKey.split(",") };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () =>
      client
        .fetch<number>(`count(*[${UNPUBLISHED_FILTER}])`, params, { perspective: "drafts" })
        .then(setCount, (error: unknown) =>
          console.error("Could not count unpublished changes", error),
        );

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
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [client, typesKey]);

  return count;
}
