import Article from "@components/article";
import { H2, P, Ul } from "@components/ui/typography";
import type { Metadata } from "next";
import { ABOUT_US_TITLE } from "../constants";

const TITLE = "Advisory Board";

const CURRENT_MEMBERS = [
  "Ravi Malhotra",
  "Tony Bhalla",
  "Ashwin Patel",
  "Rajiv Sabherwal",
  "Chandrakant Tailor",
  "Kirti Mehrotra",
];

const PAST_MEMBERS = [
  "Raghunandan Dundoo",
  "Hasmukhbhai Dehania",
  "Anil Khosla",
  "Anantha Manepalli",
  "Nilima Ghosh",
  "Ramanbhai Patel",
  "Nitai Saha",
  "Shree Thanedar",
  "Nalini Mahadevan",
  "Vijaykumar Buddhiraju",
  "G.V Naidu",
];

const RESPONSIBILITIES = [
  "Operational improvements",
  "Changes to policies and procedures",
  "Growth of the organization",
];

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: "The community leaders who advise Bal Vihar of St. Louis, past and present.",
};

export default function AboutUsAdvisoryBoardPage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <P>
        Bal Vihar has an advisory board made up of prominent people from the community. Board
        meetings are held quarterly. The board provides future direction and support to the Bal
        Vihar management team.
      </P>
      <P>The advisory board is designed to provide guidance and oversight for:</P>
      <Ul>
        {RESPONSIBILITIES.map((responsibility) => (
          <li key={responsibility}>{responsibility}</li>
        ))}
      </Ul>
      <MemberSection heading="Current Advisory Board" members={CURRENT_MEMBERS} />
      <MemberSection heading="Past Advisory Board Members" members={PAST_MEMBERS} />
    </Article>
  );
}

interface MemberSectionProps {
  heading: string;
  members: string[];
}

function MemberSection({ heading, members }: MemberSectionProps) {
  return (
    <section className="space-y-4">
      <H2>{heading}</H2>
      <Ul variant="unstyled" className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member} className="font-semibold">
            {member}
          </li>
        ))}
      </Ul>
    </section>
  );
}
