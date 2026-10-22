import Article from "@components/article";
import EventCard from "@components/event-card";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { mapCalendarEvents } from "@lib/sanity/map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Calendar`,
  description:
    "Bal Vihar class dates, celebrations, and special events for the current academic year.",
};

export default async function CalendarPage() {
  const events = mapCalendarEvents(await fetchSanityData(CALENDAR_EVENTS_QUERY));

  return (
    <Article title="Calendar" className="md:columns-1">
      <P>Class sessions, festivals, and school-wide activities.</P>

      {events.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No calendar events have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </Article>
  );
}
