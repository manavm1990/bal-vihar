import Article from "@components/article";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { H4, MutedP, P, Small } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import {
  formatCalendarDate,
  formatEventTypeLabel,
  mapCalendarEvents,
  partitionCalendarEvents,
} from "@lib/sanity/map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "@lib/sanity/queries";
import type { CalendarEventData } from "@lib/sanity/types";
import { cn } from "@lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Calendar`,
  description:
    "Bal Vihar class dates, celebrations, and special events for the current academic year.",
};

export default async function CalendarPage() {
  const payload = await fetchSanityData(CALENDAR_EVENTS_QUERY);
  const events = mapCalendarEvents(payload);
  const { highlighted, upcoming, all } = partitionCalendarEvents(events);
  const list = upcoming.length > 0 ? upcoming : all;

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
        <div className="space-y-6">
          {highlighted.length > 0 ? (
            <section className="space-y-3">
              <H4>Highlighted</H4>
              <ul className="grid gap-3 md:grid-cols-2">
                {highlighted.map((event) => (
                  <li key={`highlighted-${event.id}`}>
                    <EventCard event={event} emphasized />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-3">
            <H4>{upcoming.length > 0 ? "Upcoming & recent" : "All events"}</H4>
            <ul className="space-y-3">
              {list.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </Article>
  );
}

interface EventCardProps {
  event: CalendarEventData;
  emphasized?: boolean;
}

function EventCard({ event, emphasized = false }: EventCardProps) {
  const dateLabel = formatCalendarDate(event.date);

  return (
    <Card className={cn(emphasized && "border-l-4 border-l-primary")}>
      <CardHeader className="space-y-1 p-4 pb-2">
        <CardTitle className="text-base">{event.title}</CardTitle>
        <MutedP>
          {dateLabel}
          {event.time ? ` · ${event.time}` : ""}
          {event.location ? ` · ${event.location}` : ""}
        </MutedP>
      </CardHeader>
      {(event.description || event.eventType || event.academicYear) && (
        <CardContent className="space-y-1 p-4 pt-0">
          {event.eventType ? (
            <Small className="capitalize text-slate-600">
              {formatEventTypeLabel(event.eventType)}
            </Small>
          ) : null}
          {event.academicYear ? <MutedP>Academic year: {event.academicYear}</MutedP> : null}
          {event.description ? <P className="whitespace-pre-line">{event.description}</P> : null}
        </CardContent>
      )}
    </Card>
  );
}
