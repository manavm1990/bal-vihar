import type { SearchHit } from "@lib/search/find-results";
import { useEffect, useState } from "react";

const DEBOUNCE_MS = 150;

interface Settled {
  query: string;
  hits: SearchHit[];
  hasFailed: boolean;
}

/** Fetches results as the visitor types. Waits a beat between keystrokes and drops stale requests. */
export default function useLiveSearch(query: string) {
  const [settled, setSettled] = useState<Settled | null>(null);
  const trimmed = query.trim();

  useEffect(() => {
    // Effect is needed to sync the results with a server request that follows the typed query.
    if (!trimmed) {
      setSettled(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Search responded with ${response.status}`);

        const { hits } = (await response.json()) as { hits: SearchHit[] };
        setSettled({ query: trimmed, hits, hasFailed: false });
      } catch {
        if (!controller.signal.aborted) setSettled({ query: trimmed, hits: [], hasFailed: true });
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  return {
    /** The latest answer, which may still be for an earlier query while a newer one loads. */
    settled,
    isPending: trimmed !== "" && settled?.query !== trimmed,
  } as const;
}
