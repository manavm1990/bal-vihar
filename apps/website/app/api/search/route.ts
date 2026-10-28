import { createSearchHit, findResults } from "@lib/search/find-results";
import { parseSearchQuery } from "@lib/search/search";

const LIVE_RESULT_LIMIT = 5;

export const GET = async (request: Request) => {
  const query = parseSearchQuery(new URL(request.url).searchParams.get("q") ?? undefined);
  if (!query) return Response.json({ hits: [] });

  const results = await findResults(query, LIVE_RESULT_LIMIT);

  return Response.json({ hits: results.map(createSearchHit) });
};
