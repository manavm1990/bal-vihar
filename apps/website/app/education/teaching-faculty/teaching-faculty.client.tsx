"use client";

import SectionNav from "@components/section-nav";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { H2, H3, H4, MutedP, Ul } from "@components/ui/typography";
import { FADE } from "@lib/animations";
import type {
  DirectoryEntry,
  FacultyAssistant,
  FacultyGroup,
  FacultyPerson,
  FacultyProgram,
  FacultyTeam,
  TeachingFacultyView,
} from "@lib/sanity/teaching-faculty";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

interface TeachingFacultyProps {
  view: TeachingFacultyView;
}

/** A group picker, program cards and a searchable A–Z list of everyone on the faculty. */
export default function TeachingFaculty({ view }: TeachingFacultyProps) {
  const { groups, programs, directory } = view;
  const links = [
    ...(groups.length > 0 ? [{ href: "#find-your-group", title: "Find your group" }] : []),
    ...(programs.length > 0 ? [{ href: "#programs", title: "Programs" }] : []),
    ...(directory.length > 0 ? [{ href: "#everyone", title: "Everyone, A to Z" }] : []),
  ];

  return (
    <div className="space-y-10">
      <SectionNav label="On this page" links={links} />
      {groups.length > 0 && <GroupPicker groups={groups} />}
      {programs.length > 0 && <Programs programs={programs} />}
      {directory.length > 0 && <Directory entries={directory} />}
    </div>
  );
}

interface AssistantListProps {
  assistants: FacultyAssistant[];
}

function AssistantList({ assistants }: AssistantListProps) {
  return assistants.length === 0 ? null : (
    <div className="bg-gray-50 space-y-1 rounded-md p-3">
      <p className="text-primary-ink text-xs font-semibold tracking-wider uppercase">
        Youth assistants
      </p>
      <Ul variant="unstyled" className="space-y-0.5 text-sm">
        {assistants.map((assistant) => (
          <li key={assistant.key} className="flex items-center gap-2">
            <span>{assistant.name}</span>
            <span className="bg-navy-100 text-navy-900 rounded px-1.5 text-xs">
              {assistant.level}
            </span>
          </li>
        ))}
      </Ul>
    </div>
  );
}

interface DirectoryProps {
  entries: DirectoryEntry[];
}

function Directory({ entries }: DirectoryProps) {
  const { query, setQuery, shown } = useDirectorySearch(entries);

  return (
    <section aria-labelledby="everyone" className="space-y-4">
      <H2 id="everyone" variant="plain" className="scroll-mt-6 text-2xl tracking-tight">
        Everyone, A to Z
      </H2>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="faculty-search" className="text-sm font-semibold">
          Search by name
        </label>
        <input
          id="faculty-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border-input bg-background focus-visible:ring-ring h-11 w-full max-w-sm rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <MutedP aria-live="polite">
          {shown.length} {shown.length === 1 ? "person" : "people"}
        </MutedP>
      </div>
      {shown.length === 0 ? (
        <MutedP>No one matches that name.</MutedP>
      ) : (
        <Ul variant="unstyled" className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((entry) => (
            <li key={entry.id} className="min-w-0 space-y-1">
              <PersonContact person={entry} />
              <div className="flex flex-wrap gap-1">
                {entry.roles.map((role) => (
                  <span key={role} className="bg-muted rounded px-2 py-0.5 text-xs">
                    {role}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </Ul>
      )}
    </section>
  );
}

interface GroupPickerProps {
  groups: FacultyGroup[];
}

function GroupPicker({ groups }: GroupPickerProps) {
  const { group, select, fadeIn } = useSelectedGroup(groups);
  const balViharGroups = groups.filter((item) => item.kind === "balVihar");
  const youthGroups = groups.filter((item) => item.kind === "youth");

  return (
    <section aria-labelledby="find-your-group" className="space-y-4">
      <H2 id="find-your-group" variant="plain" className="scroll-mt-6 text-2xl tracking-tight">
        Find your group
      </H2>
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        <GroupButtons
          legend="Bal Vihar group"
          groups={balViharGroups}
          selectedKey={group?.key}
          onSelect={select}
        />
        <GroupButtons
          legend="Youth Group"
          groups={youthGroups}
          selectedKey={group?.key}
          onSelect={select}
        />
      </div>
      {group && (
        <motion.div key={group.key} className="space-y-4" {...fadeIn}>
          <H3 className="text-xl">
            {group.kind === "youth" ? `Youth Group ${group.name}` : `Group ${group.name}`}
          </H3>
          {group.teams.length === 0 ? (
            <MutedP>No one is listed for this group yet.</MutedP>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {group.teams.map((team) => (
                <TeamColumn key={team.key} team={team} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}

interface GroupButtonsProps {
  legend: string;
  groups: FacultyGroup[];
  selectedKey: string | undefined;
  onSelect: (key: string) => void;
}

function GroupButtons({ legend, groups, selectedKey, onSelect }: GroupButtonsProps) {
  return groups.length === 0 ? null : (
    <fieldset className="min-w-0 space-y-2">
      <legend className="mb-2 font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {groups.map((item) => (
          <Button
            key={item.key}
            type="button"
            variant={item.key === selectedKey ? "default" : "outline"}
            aria-pressed={item.key === selectedKey}
            className="h-12 min-w-12"
            onClick={() => onSelect(item.key)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

interface PersonContactProps {
  person: Pick<FacultyPerson, "email" | "name" | "phone"> & { isBackup?: boolean };
}

function PersonContact({ person }: PersonContactProps) {
  return (
    <div className="min-w-0 space-y-0.5">
      <p className="font-semibold">
        {person.name}
        {person.isBackup && (
          <span className="bg-muted text-muted-foreground ml-2 rounded px-2 py-0.5 text-xs font-normal">
            Backup
          </span>
        )}
      </p>
      {person.email && (
        <a className="block w-fit max-w-full text-sm break-all" href={`mailto:${person.email}`}>
          {person.email}
        </a>
      )}
      {person.phone && (
        <a className="block w-fit text-sm" href={`tel:${toDialable(person.phone)}`}>
          {person.phone}
        </a>
      )}
    </div>
  );
}

interface ProgramsProps {
  programs: FacultyProgram[];
}

function Programs({ programs }: ProgramsProps) {
  const coordinated = programs.filter((program) => program.coordinators.length > 0);
  const teams = programs.filter(
    (program) => program.team.length > 0 || program.assistants.length > 0,
  );

  return (
    <section aria-labelledby="programs" className="space-y-4">
      <H2 id="programs" variant="plain" className="scroll-mt-6 text-2xl tracking-tight">
        Programs and coordinators
      </H2>
      <div className="gap-4 sm:columns-2 lg:columns-3">
        {coordinated.length > 0 && (
          <Card className="mb-4 break-inside-avoid">
            <CardHeader>
              <H3 className="text-xl">Coordinators</H3>
            </CardHeader>
            <CardContent className="space-y-4">
              {coordinated.map((program) => (
                <div key={program.key} className="space-y-1">
                  <p className="text-primary-ink text-xs font-semibold tracking-wider uppercase">
                    {program.name}
                  </p>
                  {program.coordinators.map((person) => (
                    <PersonContact key={person.id} person={person} />
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {teams.map((program) => (
          <Card key={program.key} className="mb-4 break-inside-avoid">
            <CardHeader>
              <H3 className="text-xl">
                {program.coordinators.length > 0 ? `${program.name} team` : program.name}
              </H3>
            </CardHeader>
            <CardContent className="space-y-3">
              {program.team.map((person) => (
                <PersonContact key={person.id} person={person} />
              ))}
              <AssistantList assistants={program.assistants} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

interface TeamColumnProps {
  team: FacultyTeam;
}

function TeamColumn({ team }: TeamColumnProps) {
  return (
    <div className="min-w-0 space-y-3">
      <div className="border-primary flex flex-wrap items-baseline gap-x-2 border-b-2 pb-1">
        <H4 className="text-secondary text-lg">{team.subject}</H4>
        {team.section && <MutedP>{team.section}</MutedP>}
      </div>
      {team.teachers.length === 0 ? (
        <MutedP>No one listed.</MutedP>
      ) : (
        <Ul variant="unstyled" className="space-y-3">
          {team.teachers.map((teacher) => (
            <li key={teacher.id}>
              <PersonContact person={teacher} />
            </li>
          ))}
        </Ul>
      )}
      <AssistantList assistants={team.assistants} />
    </div>
  );
}

const toDialable = (phone: string) => phone.replace(/[ ()-]/g, "");

function useDirectorySearch(entries: DirectoryEntry[]) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const shown = needle
    ? entries.filter((entry) => entry.name.toLowerCase().includes(needle))
    : entries;

  return { query, setQuery, shown };
}

function useSelectedGroup(groups: FacultyGroup[]) {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(groups[0]?.key);
  const group = groups.find((item) => item.key === selectedKey) ?? groups[0];
  const [hasPicked, setHasPicked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Fade only after a tap, so the first paint is never hidden while the page hydrates.
  const fadeIn =
    shouldReduceMotion || !hasPicked
      ? {}
      : { initial: FADE.initial, animate: FADE.animate, transition: FADE.transition };

  const select = (key: string) => {
    setSelectedKey(key);
    setHasPicked(true);
  };

  return { group, select, fadeIn };
}
