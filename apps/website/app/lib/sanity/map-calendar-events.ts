import { stegaClean } from "@sanity/client/stega";
import type { CalendarEventData } from "./types";

interface UpcomingOptions {
  limit?: number;
  now?: Date;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
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

export const getUpcomingCalendarEvents = (
  events: CalendarEventData[],
  { limit = 5, now = new Date() }: UpcomingOptions = {},
) =>
  events
    .filter(
      (event) => event.date >= now.toLocaleDateString("en-CA", { timeZone: "America/Chicago" }),
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
