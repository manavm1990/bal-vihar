import Article from "@components/article";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { VOLUNTEER_ROSTER_QUERY } from "@lib/sanity/queries";
import { getVolunteerRosterView } from "@lib/sanity/volunteer-roster";
import type { Metadata } from "next";
import VolunteerRoster from "./volunteer-roster.client";

const TITLE = "Our Volunteers";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Thank you to the volunteers who helped run Bal Vihar's events, classes and administration, listed by event and A to Z.",
};

export default async function VolunteersPage() {
  const result = await fetchSanityOrNull(VOLUNTEER_ROSTER_QUERY, "the event volunteers");
  const view = getVolunteerRosterView(result?.data);

  return (
    <Article title={TITLE} subtitle={view.schoolYear ?? undefined} className="md:columns-1">
      {view.activities.length === 0 ? (
        <MutedP>Coming soon.</MutedP>
      ) : (
        <VolunteerRoster view={view} />
      )}
    </Article>
  );
}
