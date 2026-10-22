import { formatCalendarDate } from "@lib/sanity/map-calendar-events";
import type { CalendarEventData } from "@lib/sanity/types";

import { Card } from "./ui/card";
import { MutedP } from "./ui/typography";

interface EventCardProps {
  event: CalendarEventData;
}

export default function EventCard({ event }: EventCardProps) {
  const venue = event.description ?? event.location;
  const parsed = new Date(`${event.date}T12:00:00`);
  const hasDate = !Number.isNaN(parsed.getTime());

  return (
    <Card className="flex items-center gap-4 p-3">
      {hasDate ? (
        <time
          dateTime={event.date}
          className="bg-primary text-primary-foreground flex size-16 shrink-0 flex-col items-center justify-center rounded-md leading-none"
        >
          <span className="text-xs font-semibold uppercase">
            {parsed.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="font-eczar text-2xl font-bold">{parsed.getDate()}</span>
        </time>
      ) : null}
      <div className="space-y-1">
        <h3 className="text-foreground text-base leading-snug font-semibold">{event.title}</h3>
        <MutedP>
          {formatCalendarDate(event.date)}
          {event.time ? ` · ${event.time}` : ""}
          {venue ? ` · ${venue}` : ""}
        </MutedP>
      </div>
    </Card>
  );
}
