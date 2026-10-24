import Article from "@components/article";
import { H2, MutedP, P, Ul } from "@components/ui/typography";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { VOLUNTEERS_LIST_QUERY } from "@lib/sanity/queries";
import { getVolunteerContactLinks, type VolunteerTeam } from "@lib/sanity/volunteers-list";
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT_US_TITLE } from "../constants";

const TITLE = "Administrative Team 👨‍🏫";

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: "Meet the volunteer teams that run Bal Vihar and what each team does.",
};

export default async function AdministrativeTeamPage() {
  const result = await fetchSanityOrNull(VOLUNTEERS_LIST_QUERY, "the volunteer roster");
  const teams = result?.data?.teams ?? [];

  return (
    <Article title={TITLE} className="md:columns-1">
      <P>
        Bal Vihar of St. Louis has a well organized structure comprised of different teams working
        together for smooth delivery of education, execution of operations and various events. These
        individuals are all dedicated volunteers. To get in touch with a team,{" "}
        <Link href="/questions#contact">contact Bal Vihar</Link>.
      </P>
      {teams.length === 0 ? (
        <MutedP>Coming soon.</MutedP>
      ) : (
        <div className="space-y-8">
          {teams.map((team) => (
            <VolunteerTeamSection key={team._key} team={team} />
          ))}
        </div>
      )}
    </Article>
  );
}

interface VolunteerContactProps {
  member: NonNullable<VolunteerTeam["members"]>[number];
}

function VolunteerContact({ member }: VolunteerContactProps) {
  const { email, phone } = getVolunteerContactLinks(member.email, member.phone);

  return !member.name ? null : (
    <li className="min-w-0 space-y-1">
      <span className="font-semibold">{member.name}</span>
      {email ? (
        <a className="block w-fit max-w-full break-all" href={`mailto:${email}`}>
          {email}
        </a>
      ) : null}
      {phone ? (
        <a className="block w-fit" href={`tel:${phone.replace(/[ ()-]/g, "")}`}>
          {phone}
        </a>
      ) : null}
    </li>
  );
}

interface VolunteerTeamSectionProps {
  team: VolunteerTeam;
}

function VolunteerTeamSection({ team }: VolunteerTeamSectionProps) {
  const members = team.members ?? [];

  return (
    <section className="space-y-4">
      <H2>{team.name}</H2>
      {team.description ? <P>{team.description}</P> : null}
      {members.length === 0 ? (
        <MutedP>Coming soon.</MutedP>
      ) : (
        <Ul variant="unstyled" className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <VolunteerContact key={member._key} member={member} />
          ))}
        </Ul>
      )}
    </section>
  );
}
