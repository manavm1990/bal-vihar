import { locateColumns, type Row, SheetError, toText } from "./sheet";

interface Activity {
  name: string;
  volunteers: Map<string, string>;
}

export interface VolunteerActivity {
  name: string;
  volunteers: string[];
}

const capitalize = (text: string) =>
  text.replace(
    /(^|[\s'’/&-])(\p{L})/gu,
    (_match: string, boundary: string, letter: string) => `${boundary}${letter.toUpperCase()}`,
  );

const formatName = (name: string) =>
  name === name.toUpperCase() || name === name.toLowerCase()
    ? capitalize(name.toLowerCase())
    : name;

const splitEvents = (cell: unknown) =>
  typeof cell === "string"
    ? cell
        .split(/[,;\n]/)
        .map(toText)
        .filter(Boolean)
    : [];

/**
 * The sheet lists events per person; the website lists names per event,
 * so this flips it.
 */
export function parseVolunteerRoster(rows: Row[]) {
  const located = locateColumns(rows, [
    { pattern: /^(volunteer )?name$/i, required: true },
    { pattern: /^events?$/i, required: true },
  ]);
  if (!located) throw new SheetError("could not find the “Volunteer name” and “Events” columns.");

  const [nameColumn = -1, eventsColumn = -1] = located.columns;
  const activities = new Map<string, Activity>();
  const volunteers = new Set<string>();
  let skippedRows = 0;

  // Yes. Imperative > functional for this case.
  for (const row of rows.slice(located.start + 1)) {
    const name = formatName(toText(row[nameColumn]));
    const events = splitEvents(row[eventsColumn]).filter((event) => !/^declined?$/i.test(event));
    if (!name && events.length === 0) continue;
    if (!name || events.length === 0) {
      skippedRows += 1;
      continue;
    }

    const nameKey = name.toLowerCase();
    volunteers.add(nameKey);

    for (const event of events) {
      const eventKey = event.toLowerCase();
      const activity = activities.get(eventKey) ?? { name: event, volunteers: new Map() };

      if (!activity.volunteers.has(nameKey)) activity.volunteers.set(nameKey, name);
      activities.set(eventKey, activity);
    }
  }

  return {
    activities: [...activities.values()].map(({ name, volunteers: names }) => ({
      name,
      volunteers: [...names.values()],
    })),
    skippedRows,
    volunteerCount: volunteers.size,
  } as const;
}
