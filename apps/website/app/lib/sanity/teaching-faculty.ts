import type { TEACHING_FACULTY_QUERY_RESULT } from "sanity.types";
import { cleanText, type DirectoryEntry, type DirectoryPerson, sortDirectory } from "./directory";
import { getVolunteerContactLinks } from "./volunteers-list";

type Credit =
  | { kind: "assistant"; person: DirectoryPerson; label: string; level: string }
  | { kind: "coordinator" | "team"; person: DirectoryPerson; label: string }
  | { kind: "subject"; person: DirectoryPerson; label: string; subject: string };

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
            createPeople([slot], slot.isBackup === true),
          ),
          assistants: createAssistants(team.assistants),
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
        coordinators: createPeople(program.coordinators),
        team: createPeople(program.team),
        assistants: createAssistants(program.assistants),
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

export const formatSubject = (subject: string) => (subject === "Teachers" ? "Youth" : subject);

const getAssistantCredits = (assistants: FacultyAssistant[], label: string): Credit[] =>
  assistants.map(({ name, level }) => ({
    kind: "assistant",
    person: { id: `assistant:${name.toLowerCase()}`, name, email: null, phone: null },
    label,
    level,
  }));

const getCredits = (groups: FacultyGroup[], programs: FacultyProgram[]): Credit[] => [
  ...programs.flatMap((program): Credit[] => [
    ...program.coordinators.map((person) => ({
      kind: "coordinator" as const,
      person,
      label: program.name,
    })),
    ...program.team.map((person) => ({ kind: "team" as const, person, label: program.name })),
    ...getAssistantCredits(program.assistants, program.name),
  ]),
  ...groups.flatMap((group) =>
    group.teams.flatMap((team): Credit[] => {
      const subject = formatSubject(team.subject);

      return [
        ...team.teachers.map((person) => ({
          kind: "subject" as const,
          person,
          subject,
          label: person.isBackup ? `${group.name} (backup)` : group.name,
        })),
        ...getAssistantCredits(team.assistants, `${subject} ${group.name}`),
      ];
    }),
  ),
];

function buildDirectory(groups: FacultyGroup[], programs: FacultyProgram[]): DirectoryEntry[] {
  const credits = getCredits(groups, programs);
  const creditsById = Map.groupBy(credits, ({ person }) => person.id);
  // Reversed so the first credit's contact details win, as Map keeps the last duplicate.
  const people = new Map(credits.toReversed().map(({ person }) => [person.id, person]));

  return sortDirectory(
    [...people.values()].map(({ id, name, email, phone }) => ({
      id,
      name,
      email,
      phone,
      roles: getRoles(creditsById.get(id) ?? []),
    })),
  );
}

function getRoles(credits: Credit[]) {
  const ofKind = <K extends Credit["kind"]>(kind: K) =>
    credits.filter((credit): credit is Extract<Credit, { kind: K }> => credit.kind === kind);
  const subjects = Map.groupBy(ofKind("subject"), ({ subject }) => subject);
  const assistants = ofKind("assistant");
  const assistantLabels = [...new Set(assistants.map(({ label }) => label))];

  return [
    ...ofKind("coordinator").map(({ label }) => `Coordinator · ${label}`),
    ...[...subjects].map(
      ([subject, list]) => `${subject} ${list.map(({ label }) => label).join(", ")}`,
    ),
    ...ofKind("team").map(({ label }) => `${label} team`),
    ...(assistants.length > 0
      ? [`${assistants.at(-1)?.level} assistant · ${assistantLabels.join(", ")}`]
      : []),
  ];
}

function createAssistants(list: RawAssistant[] | null | undefined): FacultyAssistant[] {
  return (list ?? []).flatMap((assistant) => {
    const name = cleanText(assistant.name);

    return name ? [{ key: assistant._key, name, level: cleanText(assistant.level) }] : [];
  });
}

function createPeople(
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
