import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  (await draftMode()).disable();

  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/";
  const destination = redirectTo.startsWith("/") ? redirectTo : "/";

  return NextResponse.redirect(new URL(destination, request.nextUrl.origin));
};
