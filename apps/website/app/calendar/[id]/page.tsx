import Article from "@components/article";
import EventCard from "@components/event-card.client";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import { formatCalendarEventMeta, mapCalendarEvents } from "@lib/sanity/map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const MAX_NOTE_LENGTH = 120;

interface CalendarEventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CalendarEventPageProps): Promise<Metadata> {
  const event = await fetchCalendarEvent((await params).id, { stega: false });
  if (!event) return {};

  const note = event.description?.trim();
  const description = [
    formatCalendarEventMeta(event),
    note && note.length > MAX_NOTE_LENGTH ? `${note.slice(0, MAX_NOTE_LENGTH).trimEnd()}…` : note,
  ]
    .filter(Boolean)
    .join(". ");
  const title = `${event.title} | ${BASE_TITLE}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: `/calendar/${event.id}`,
      title,
      description,
    },
  } as const;
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: CALENDAR_EVENTS_QUERY });

  return data.map(({ _id }) => ({ id: _id }));
}

export default function CalendarEventPage({ params }: CalendarEventPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading event…</MutedP>}>
      <CalendarEventContent params={params} />
    </Suspense>
  );
}

async function CalendarEventContent({ params }: CalendarEventPageProps) {
  const event = await fetchCalendarEvent((await params).id);
  if (!event) notFound();

  return (
    <Article title={event.title} className="md:columns-1">
      <Link href="/calendar" className="block w-fit">
        ← All events
      </Link>
      <div className="max-w-xl">
        <EventCard event={event} />
      </div>
    </Article>
  );
}

const fetchCalendarEvent = async (id: string, options?: { stega?: boolean }) =>
  mapCalendarEvents(await fetchSanityData(CALENDAR_EVENTS_QUERY, options)).find(
    (event) => event.id === id,
  ) ?? null;
