import { stegaClean } from "@sanity/client/stega";
import { SITE_URL } from "../constants";
import { createWhatsAppShareUrl } from "../share";
import type { CalendarEventData } from "./types";

interface UpcomingOptions {
  limit?: number;
  now?: Date;
}

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

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

export const createCalendarEventShareUrl = (event: CalendarEventData) =>
  createWhatsAppShareUrl([
    event.title,
    formatCalendarEventMeta(event),
    `${SITE_URL}/calendar/${event.id}`,
  ]);

/** One line with the date, time and place, for cards, previews and share messages. */
export const formatCalendarEventMeta = (event: CalendarEventData) =>
  [formatCalendarDate(event.date), event.time, event.location].filter(Boolean).join(" · ");

export const mapCalendarEvents = (input: unknown): CalendarEventData[] =>
  !Array.isArray(input)
    ? []
    : input.flatMap((row) => {
        if (!isRecord(row)) return [];

        const id = isString(row["_id"]) ? row["_id"] : isString(row["id"]) ? row["id"] : null;
        const title = isString(row["title"]) ? row["title"] : null;
        // Clean date for upcoming filters / sort; stega breaks string compares and Date.parse.
        const date = isString(row["date"]) ? stegaClean(row["date"]) : null;

        return !id || !title || !date
          ? []
          : [
              {
                id,
                title,
                date,
                location: isString(row["location"]) ? row["location"] : null,
                eventType: isString(row["eventType"]) ? row["eventType"] : null,
                time: isString(row["time"]) ? row["time"] : null,
                description: isString(row["description"]) ? row["description"] : null,
                isHighlighted: isBoolean(row["isHighlighted"]) ? row["isHighlighted"] : null,
                academicYear: isString(row["academicYear"]) ? row["academicYear"] : null,
              } satisfies CalendarEventData,
            ];
      });

const chicagoToday = (now = new Date()) =>
  now.toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

const sortByDateAsc = (events: CalendarEventData[]) =>
  [...events].sort((a, b) => a.date.localeCompare(b.date));

export const getUpcomingCalendarEvents = (
  events: CalendarEventData[],
  { limit = 5, now = new Date() }: UpcomingOptions = {},
) => {
  const today = chicagoToday(now);

  return sortByDateAsc(events.filter((event) => event.date >= today)).slice(0, limit);
};

export function createCalendarEventIcs(event: CalendarEventData) {
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
    `UID:${event.id}@balviharstlouis.org`,
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

const escapeIcsText = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
