import { fetchSanityData } from "./fetch";
import { mapCalendarEvents } from "./map-calendar-events";
import { CALENDAR_EVENTS_QUERY } from "./queries";

export const fetchCalendarEvent = async (id: string, options?: { stega?: boolean }) =>
  mapCalendarEvents(await fetchSanityData(CALENDAR_EVENTS_QUERY, options)).find(
    (event) => event.id === id,
  ) ?? null;
