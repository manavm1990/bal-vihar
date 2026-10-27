import Article from "@components/article";
import EventCard from "@components/event-card.client";
import { Card, CardContent } from "@components/ui/card";
import { MutedP } from "@components/ui/typography";
import { getCachedNow } from "@lib/clock";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { getUpcomingCalendarEvents, mapCalendarEvents } from "@lib/sanity/map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Calendar`,
  description: "Bal Vihar class dates, celebrations, and special events.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BASE_TITLE,
    url: "/calendar",
    title: `${BASE_TITLE} | Calendar`,
    description: "Bal Vihar class dates, celebrations, and special events.",
  },
};

export default function CalendarPage() {
  return (
    <Article title="Calendar" className="md:columns-1">
      <MutedP className="max-w-prose">
        Class Sundays and special events. Use the calendar icon on a card to add it to your own
        calendar. Special events may include extra notes from the school.
      </MutedP>
      <CalendarEvents />
    </Article>
  );
}

async function CalendarEvents() {
  const [payload, now] = await Promise.all([
    fetchSanityData(CALENDAR_EVENTS_QUERY),
    getCachedNow(),
  ]);
  const events = mapCalendarEvents(payload);
  const upcoming = getUpcomingCalendarEvents(events, { limit: Number.POSITIVE_INFINITY, now });

  return events.length === 0 ? (
    <Card>
      <CardContent className="p-4">
        <MutedP>No calendar events have been published yet. Please check back soon.</MutedP>
      </CardContent>
    </Card>
  ) : upcoming.length === 0 ? (
    <MutedP>No upcoming events are scheduled right now.</MutedP>
  ) : (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {upcoming.map((event) => (
        <li key={event.id} className="min-w-0">
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
