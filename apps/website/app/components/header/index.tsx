import { Button } from "@components/ui/button";
import { getCachedNow } from "@lib/clock";
import { BASE_TITLE, ORGANIZATION_LEGAL_NAME, REGISTRATION_URL } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import {
  formatCalendarDate,
  getUpcomingCalendarEvents,
  mapCalendarEvents,
} from "@lib/sanity/map-calendar-events";
import { mapHomePage } from "@lib/sanity/map-home-page";
import { CALENDAR_EVENTS_QUERY, HOME_PAGE_QUERY } from "@lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { DesktopNav, MobileNav } from "./navs";
import SearchMenu from "./search-menu.client";

export default function Header() {
  return (
    <header className="border-b-border relative border-b shadow-sm">
      <div className="bg-navy-900 text-white">
        <div className="container flex flex-col gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase sm:flex-row sm:items-center sm:justify-between">
          <Suspense fallback={<div className="min-h-8 sm:min-h-4" />}>
            <Notice />
          </Suspense>

          <div className="flex items-center justify-center gap-4 sm:justify-end">
            <Link
              href="/calendar"
              className="text-primary hover:underline hover:underline-offset-2"
            >
              Calendar
            </Link>
            <Link href="/donate" className="text-primary hover:underline hover:underline-offset-2">
              Donate
            </Link>
          </div>
        </div>
      </div>

      <div className="container relative flex items-center gap-x-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 pr-24 sm:gap-4 xl:pr-0">
          <Image
            src="/logo.svg"
            alt=""
            width={180}
            height={173}
            priority
            className="size-20 shrink-0 sm:size-24 md:size-28"
          />
          <span className="font-display text-navy min-w-0 text-sm leading-snug font-semibold sm:text-base md:text-lg">
            <span className="sr-only">{BASE_TITLE} – </span>
            {ORGANIZATION_LEGAL_NAME}
          </span>
        </Link>

        <MobileNav />
        <DesktopNav />

        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={REGISTRATION_URL}>Enroll</Link>
          </Button>
          <SearchMenu />
        </div>
      </div>
    </header>
  );
}

async function Notice() {
  const [homePayload, calendarPayload, now] = await Promise.all([
    fetchSanityData(HOME_PAGE_QUERY),
    fetchSanityData(CALENDAR_EVENTS_QUERY),
    getCachedNow(),
  ]);
  const home = mapHomePage(homePayload);
  const nextEvent = getUpcomingCalendarEvents(mapCalendarEvents(calendarPayload), {
    limit: 1,
    now,
  })[0];
  const override = home?.noticeText?.trim();
  const noticeText =
    override ||
    (nextEvent
      ? `Next up: ${nextEvent.title} · ${formatCalendarDate(nextEvent.date)}`
      : "Classes meet on Sundays");
  const noticeHref = override ? home?.noticeHref : nextEvent ? "/calendar" : undefined;
  const noticeLabel = override ? home?.noticeLabel : nextEvent ? "View calendar" : undefined;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
      <span className="text-navy-200">{noticeText}</span>
      {noticeHref && noticeLabel ? (
        <Link href={noticeHref} className="text-primary underline underline-offset-2">
          {noticeLabel}
        </Link>
      ) : null}
    </div>
  );
}
