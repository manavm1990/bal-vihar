import type { TEACHING_FACULTY_QUERY_RESULT } from "sanity.types";
import { cleanText, type DirectoryEntry, type DirectoryPerson, sortDirectory } from "./directory";
import { getVolunteerContactLinks } from "./volunteers-list";

interface DirectoryAccumulator {
  entry: DirectoryPerson;
  coordinates: string[];
  teams: string[];
  subjects: Map<string, string[]>;
  assistantLevel: string;
  assistantLabels: string[];
}

interface RawAssistant {
  _key: string;
  name: string | null;
  level: string | null;
}

interface RawPerson {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface FacultyAssistant {
  key: string;
  name: string;
  level: string;
}

export interface FacultyGroup {
  key: string;
  name: string;
  kind: "balVihar" | "youth";
  teams: FacultyTeam[];
}

export interface FacultyPerson extends DirectoryPerson {
  isBackup: boolean;
}

export interface FacultyProgram {
  key: string;
  name: string;
  coordinators: FacultyPerson[];
  team: FacultyPerson[];
  assistants: FacultyAssistant[];
}

export interface FacultyTeam {
  key: string;
  subject: string;
  section: string | null;
  teachers: FacultyPerson[];
  assistants: FacultyAssistant[];
}

export interface TeachingFacultyView {
  schoolYear: string | null;
  groups: FacultyGroup[];
  programs: FacultyProgram[];
  directory: DirectoryEntry[];
}

/** Maps the TeachingFaculty query into plain, serializable data for the page. */
export function getTeachingFacultyView(
  data: TEACHING_FACULTY_QUERY_RESULT | null | undefined,
): TeachingFacultyView {
  const groups = (data?.groups ?? []).flatMap((group): FacultyGroup[] => {
    const name = cleanText(group.name);
    if (!name) return [];

    const teams = (group.teams ?? []).flatMap((team): FacultyTeam[] => {
      const subject = cleanText(team.subject);
      if (!subject) return [];

      return [
        {
          key: team._key,
          subject,
          section: cleanText(team.section) || null,
          teachers: (team.teachers ?? []).flatMap((slot) =>
            toPeople([slot], slot.isBackup === true),
          ),
          assistants: toAssistants(team.assistants),
        },
      ];
    });

    return [{ key: group._key, name, kind: group.kind === "youth" ? "youth" : "balVihar", teams }];
  });

  const programs = (data?.programs ?? []).flatMap((program): FacultyProgram[] => {
    const name = cleanText(program.name);
    if (!name) return [];

    return [
      {
        key: program._key,
        name,
        coordinators: toPeople(program.coordinators),
        team: toPeople(program.team),
        assistants: toAssistants(program.assistants),
      },
    ];
  });

  return {
    schoolYear: cleanText(data?.schoolYear) || null,
    groups,
    programs,
    directory: buildDirectory(groups, programs),
  };
}

/** Reader-facing name for a subject; the Youth Group's teachers are listed as "Youth". */
export const formatSubject = (subject: string) => (subject === "Teachers" ? "Youth" : subject);

function addAssistants(
  people: Map<string, DirectoryAccumulator>,
  assistants: FacultyAssistant[],
  label: string,
) {
  for (const assistant of assistants) {
    const person = getAccumulator(people, `assistant:${assistant.name.toLowerCase()}`, {
      id: `assistant:${assistant.name.toLowerCase()}`,
      name: assistant.name,
      email: null,
      phone: null,
    });
    person.assistantLevel = assistant.level;
    if (!person.assistantLabels.includes(label)) person.assistantLabels.push(label);
  }
}

function buildDirectory(groups: FacultyGroup[], programs: FacultyProgram[]): DirectoryEntry[] {
  const people = new Map<string, DirectoryAccumulator>();

  for (const program of programs) {
    for (const person of program.coordinators)
      getAccumulator(people, person.id, person).coordinates.push(program.name);
    for (const person of program.team)
      getAccumulator(people, person.id, person).teams.push(program.name);
    addAssistants(people, program.assistants, program.name);
  }

  for (const group of groups) {
    for (const team of group.teams) {
      const subject = formatSubject(team.subject);

      for (const teacher of team.teachers) {
        const subjects = getAccumulator(people, teacher.id, teacher).subjects;
        const label = teacher.isBackup ? `${group.name} (backup)` : group.name;
        subjects.set(subject, [...(subjects.get(subject) ?? []), label]);
      }
      addAssistants(people, team.assistants, `${subject} ${group.name}`);
    }
  }

  return sortDirectory(
    [...people.values()].map((person) => ({ ...person.entry, roles: getRoles(person) })),
  );
}

function getAccumulator(
  people: Map<string, DirectoryAccumulator>,
  id: string,
  person: DirectoryPerson,
): DirectoryAccumulator {
  const existing = people.get(id);
  if (existing) return existing;

  const created: DirectoryAccumulator = {
    entry: { id, name: person.name, email: person.email, phone: person.phone },
    coordinates: [],
    teams: [],
    subjects: new Map(),
    assistantLevel: "",
    assistantLabels: [],
  };
  people.set(id, created);

  return created;
}

function getRoles(person: DirectoryAccumulator) {
  return [
    ...person.coordinates.map((program) => `Coordinator · ${program}`),
    ...[...person.subjects].map(([subject, names]) => `${subject} ${names.join(", ")}`),
    ...person.teams.map((program) => `${program} team`),
    ...(person.assistantLabels.length > 0
      ? [`${person.assistantLevel} assistant · ${person.assistantLabels.join(", ")}`]
      : []),
  ];
}

function toAssistants(list: RawAssistant[] | null | undefined): FacultyAssistant[] {
  return (list ?? []).flatMap((assistant) => {
    const name = cleanText(assistant.name);

    return name ? [{ key: assistant._key, name, level: cleanText(assistant.level) }] : [];
  });
}

/**
 * People are typed in place, so the same name in several roles is one person in the directory,
 * matched ignoring case. Entries with no name are skipped.
 */
function toPeople(
  list: (RawPerson | null)[] | null | undefined,
  isBackup = false,
): FacultyPerson[] {
  return (list ?? []).flatMap((person) => {
    const name = cleanText(person?.name);
    if (!person || !name) return [];

    return [
      {
        id: name.toLowerCase(),
        name,
        isBackup,
        ...getVolunteerContactLinks(person.email, person.phone),
      },
    ];
  });
}
