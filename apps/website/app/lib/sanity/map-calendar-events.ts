import { type StegaBranded, stegaClean } from "@sanity/client/stega";
import type { CALENDAR_EVENTS_QUERY_RESULT } from "sanity.types";
import { SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";

export type CalendarEvent = Omit<CalendarRow, "date" | "detailsSlug" | "eventType"> & {
  date: string;
  detailsHref: string | null;
  eventType: CALENDAR_EVENTS_QUERY_RESULT[number]["eventType"];
};
type CalendarRow = StegaBranded<CALENDAR_EVENTS_QUERY_RESULT>[number];

interface UpcomingOptions {
  limit?: number;
  now?: Date;
}

export function formatCalendarDate(date: string) {
  const parsed = Date.parse(`${date}T12:00:00`);

  return Number.isNaN(parsed)
    ? date
    : new Date(parsed).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}

export const createCalendarEventShareUrl = (event: CalendarEvent) =>
  createWhatsAppShareUrl([
    event.title,
    formatCalendarEventMeta(event),
    `${SITE_URL}/calendar/${event._id}`,
  ]);

export const formatCalendarEventMeta = (event: CalendarEvent) =>
  [formatCalendarDate(event.date), event.time, event.location].filter(Boolean).join(" · ");

export const mapCalendarEvents = (
  events: readonly CalendarRow[] | null | undefined,
): CalendarEvent[] =>
  (events ?? []).flatMap(({ detailsSlug, ...event }) =>
    !event.title || !event.date
      ? []
      : [
          {
            ...event,
            date: stegaClean(event.date),
            detailsHref: detailsSlug ? `/${stegaClean(detailsSlug)}` : null,
            eventType: stegaClean(event.eventType),
          },
        ],
  );

export const chicagoToday = (now = new Date()) =>
  now.toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

const escapeIcsText = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");

const sortByDateAsc = (events: CalendarEvent[]) =>
  [...events].sort((a, b) => a.date.localeCompare(b.date));

export const getUpcomingCalendarEvents = (
  events: CalendarEvent[],
  { limit = 5, now = new Date() }: UpcomingOptions = {},
) => {
  const today = chicagoToday(now);

  return sortByDateAsc(events.filter((event) => event.date >= today)).slice(0, limit);
};

export function createCalendarEventIcs(event: CalendarEvent) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const day = event.date.replaceAll("-", "");
  const summary = escapeIcsText(event.title);
  const location = escapeIcsText(event.location ?? "");
  const description = escapeIcsText(
    [event.time ? `Time: ${event.time}` : null, event.description, event.eventType]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bal Vihar of St. Louis//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event._id}@balviharstlouis.org`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${day}`,
    `SUMMARY:${summary}`,
    description ? `DESCRIPTION:${description}` : null,
    location ? `LOCATION:${location}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter((line): line is string => Boolean(line))
    .join("\r\n");
}
