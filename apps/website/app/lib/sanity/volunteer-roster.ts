import type { VOLUNTEER_ROSTER_QUERY_RESULT } from "sanity.types";
import { cleanText, compareNames, type DirectoryEntry, sortDirectory } from "./directory";

export interface VolunteerActivity {
  key: string;
  name: string;
  volunteers: string[];
}

export interface VolunteerRosterView {
  schoolYear: string | null;
  activities: VolunteerActivity[];
  directory: DirectoryEntry[];
}

/** Maps the VolunteerRoster query into plain, serializable data for the page. */
export function getVolunteerRosterView(
  data: VOLUNTEER_ROSTER_QUERY_RESULT | null | undefined,
): VolunteerRosterView {
  const activities = (data?.activities ?? []).flatMap((activity): VolunteerActivity[] => {
    const name = cleanText(activity.name);
    if (!name) return [];

    const volunteers = new Set((activity.volunteers ?? []).map(cleanText).filter(Boolean));

    return [{ key: activity._key, name, volunteers: [...volunteers].sort(compareNames) }];
  });

  return {
    schoolYear: cleanText(data?.schoolYear) || null,
    activities,
    directory: buildDirectory(activities),
  };
}

/** One entry per person, matched ignoring case, listing every event or team they helped with. */
function buildDirectory(activities: VolunteerActivity[]): DirectoryEntry[] {
  const people = new Map<string, DirectoryEntry>();

  for (const activity of activities) {
    for (const name of activity.volunteers) {
      const id = name.toLowerCase();
      const person = people.get(id) ?? { id, name, email: null, phone: null, roles: [] };
      if (!person.roles.includes(activity.name)) person.roles.push(activity.name);
      people.set(id, person);
    }
  }

  return sortDirectory([...people.values()]);
}
