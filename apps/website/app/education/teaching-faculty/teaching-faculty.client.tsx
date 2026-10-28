"use client";

import Directory from "@components/directory";
import OptionPicker from "@components/option-picker";
import PageSection from "@components/page-section";
import PersonContact from "@components/person-contact";
import SectionNav from "@components/section-nav";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { H3, H4, MutedP, Ul } from "@components/ui/typography";
import type {
  FacultyAssistant,
  FacultyGroup,
  FacultyProgram,
  FacultyTeam,
  TeachingFacultyView,
} from "@lib/sanity/teaching-faculty";

interface TeachingFacultyProps {
  view: TeachingFacultyView;
}

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

interface GroupPickerProps {
  groups: FacultyGroup[];
}

function GroupPicker({ groups }: GroupPickerProps) {
  return (
    <OptionPicker
      id="find-your-group"
      title="Find your group"
      groups={[
        { legend: "Bal Vihar group", options: groups.filter((group) => group.kind === "balVihar") },
        { legend: "Youth Group", options: groups.filter((group) => group.kind === "youth") },
      ]}
    >
      {(group) => (
        <>
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
        </>
      )}
    </OptionPicker>
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
    <PageSection id="programs" title="Programs and coordinators">
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
    </PageSection>
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
