import { fetchSanityOrNull } from "./fetch";
import { mapCalendarEvents } from "./map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "./queries";

export async function fetchCalendarEvent(id: string, options?: { stega?: boolean }) {
  const result = await fetchSanityOrNull(CALENDAR_EVENTS_QUERY, "the calendar", {}, options);

  return mapCalendarEvents(result?.data).find((event) => event._id === id) ?? null;
}
