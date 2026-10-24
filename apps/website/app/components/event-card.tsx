import {
  createCalendarEventDownloadHref,
  formatCalendarDate,
} from "@lib/sanity/map-calendar-events";
import type { CalendarEventData } from "@lib/sanity/types";
import { cn } from "@lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Card } from "./ui/card";
import { MutedP } from "./ui/typography";

type EventTypeKey = keyof typeof EVENT_TYPE_LABELS;

interface EventCardProps {
  event: CalendarEventData;
}

const EVENT_TYPE_LABELS = {
  celebration: "Celebration",
  holiday: "Holiday",
  project: "Project",
  regular: "Classes",
  special: "Special",
} as const;

export default function EventCard({ event }: EventCardProps) {
  const parsed = new Date(`${event.date}T12:00:00`);
  const hasDate = !Number.isNaN(parsed.getTime());
  const downloadName = `${event.date}-${event.title.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  const meta = [formatCalendarDate(event.date), event.time, event.location]
    .filter(Boolean)
    .join(" · ");
  const typeLabel = eventTypeLabel(event.eventType);
  const showType = typeLabel !== null && event.eventType !== "regular";
  const note = event.description?.trim() || null;
  const highlighted = Boolean(event.isHighlighted);

  return (
    <Card
      className={cn(
        "relative flex h-full gap-3 p-3 pr-10",
        highlighted && "border-primary-300 bg-primary-50/60 border-2 shadow-none",
      )}
    >
      {hasDate ? (
        <time
          dateTime={event.date}
          className="bg-primary text-primary-foreground flex size-14 shrink-0 flex-col items-center justify-center rounded-md leading-none"
        >
          <span className="text-xs font-semibold uppercase">
            {parsed.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="font-eczar text-2xl font-bold">{parsed.getDate()}</span>
        </time>
      ) : null}

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-foreground text-base leading-snug font-semibold">{event.title}</h3>
          {showType && typeLabel ? (
            <span className="bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
              {typeLabel}
            </span>
          ) : null}
        </div>
        {meta ? <MutedP className="text-sm leading-snug">{meta}</MutedP> : null}
        {note ? (
          <MutedP className="line-clamp-3 text-sm leading-snug whitespace-pre-line">{note}</MutedP>
        ) : null}
      </div>

      <a
        href={createCalendarEventDownloadHref(event)}
        download={downloadName}
        aria-label={`Add ${event.title} to calendar`}
        title="Add to calendar"
        className="text-primary-ink hover:bg-primary-50 absolute top-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-md"
      >
        <CalendarIcon aria-hidden="true" className="size-4" />
      </a>
    </Card>
  );
}

const eventTypeLabel = (value: string | null | undefined) => {
  if (!value || !(value in EVENT_TYPE_LABELS)) return null;
  // Keys are validated against EVENT_TYPE_LABELS above.
  return EVENT_TYPE_LABELS[value as EventTypeKey];
};
