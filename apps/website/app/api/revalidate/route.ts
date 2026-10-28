import { SANITY_CONTENT_TAG } from "@lib/sanity/live";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const POST = async (request: NextRequest) => {
  const secret = process.env["SANITY_REVALIDATE_SECRET"];
  if (!secret) return Response.json({ error: "Revalidation is not configured" }, { status: 500 });

  /**
   * * The third argument waits out Content Lake's eventual consistency,
   * so the refetch isn't stale.
   */
  const { isValidSignature } = await parseBody(request, secret, true);

  if (!isValidSignature) return Response.json({ error: "Invalid signature" }, { status: 401 });

  // `expire: 0` serves no stale copy, so the next visit already shows the published change.
  revalidateTag(SANITY_CONTENT_TAG, { expire: 0 });

  return Response.json({ revalidated: true });
};
