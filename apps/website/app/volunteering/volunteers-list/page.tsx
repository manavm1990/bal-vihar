import Article from "@components/article";
import { H2, MutedP, P, Ul } from "@components/ui/typography";
import { sanityFetch } from "@lib/sanity/live";
import { VOLUNTEERS_LIST_QUERY } from "@lib/sanity/queries";
import { getVolunteerContactLinks, type VolunteerGroup } from "@lib/sanity/volunteers-list";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";
import Link from "next/link";

const PAGE = STATIC_PAGES.volunteersList;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default async function VolunteeringVolunteersListPage() {
  const result = await sanityFetch({ query: VOLUNTEERS_LIST_QUERY }).catch((error: unknown) => {
    console.error("Could not load the volunteer roster", error);
    return null;
  });
  const groups = result?.data?.groups ?? [];

  return (
    <Article title={PAGE.title} className="md:columns-1">
      <P>{PAGE.content}</P>
      <P>
        To get in touch with a volunteer team,{" "}
        <Link href="/questions#contact">contact Bal Vihar</Link>.
      </P>
      {groups.length === 0 ? (
        <MutedP>
          The volunteer roster is being updated. Please contact us for team information.
        </MutedP>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <VolunteerGroupSection key={group._key} group={group} />
          ))}
        </div>
      )}
    </Article>
  );
}

interface VolunteerContactProps {
  member: NonNullable<VolunteerGroup["members"]>[number];
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

interface VolunteerGroupSectionProps {
  group: VolunteerGroup;
}

function VolunteerGroupSection({ group }: VolunteerGroupSectionProps) {
  const members = group.members ?? [];

  return (
    <section className="space-y-4">
      <H2>{group.title}</H2>
      {members.length === 0 ? (
        <MutedP>This team’s roster is being updated.</MutedP>
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
