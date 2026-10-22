import Article from "@components/article";
import { Card, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { H2, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

const COMMUNITY_LINKS = [
  {
    href: "/education/class-webpages",
    label: "Class Webpages",
    description: "Links to each class's own page.",
    external: false,
  },
  {
    href: "/questions",
    label: "FAQs",
    description: "Answers to common questions and how to reach us.",
    external: false,
  },
  {
    href: "https://youtu.be/5wC1C89AQRA",
    label: "Daily Gita on YouTube",
    description:
      "A YouTube channel for the daily Gita, created by volunteers and Lal Prabhu Ji. Opens YouTube.",
    external: true,
  },
] as const;

const HUBS = [
  {
    href: "/resources/parents",
    label: "Parents",
    description: "Orientation, calendar, policies, and family forms.",
  },
  {
    href: "/resources/students",
    label: "Students",
    description: "Study aids, expectations, and classroom links.",
  },
  {
    href: "/resources/faculty",
    label: "Faculty",
    description: "Teaching assignments and classroom guidance.",
  },
  {
    href: "/resources/admin",
    label: "Admin",
    description: "Operational references for the administrative team.",
  },
] as const;

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Resources`,
  description: "Parent, student, faculty, and admin resource hubs for Bal Vihar of St. Louis.",
};

export default function ResourcesPage() {
  return (
    <Article title="Resources" className="md:columns-1">
      <P>Guides and links for parents, students, faculty and the administrative team.</P>
      <div className="grid gap-4 md:grid-cols-2">
        {HUBS.map((hub) => (
          <Link key={hub.href} href={hub.href} className="hover:no-underline">
            <Card className="h-full transition-colors hover:bg-muted/60">
              <CardHeader>
                <CardTitle>{hub.label}</CardTitle>
                <CardDescription>{hub.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <section className="space-y-4 pt-2">
        <H2 variant="plain" className="text-2xl tracking-tight">
          Community links
        </H2>
        <div className="grid gap-4 md:grid-cols-2">
          {COMMUNITY_LINKS.map((link) => (
            <CommunityLink key={link.href} link={link} />
          ))}
        </div>
      </section>
    </Article>
  );
}

interface CommunityLinkProps {
  link: (typeof COMMUNITY_LINKS)[number];
}

function CommunityLink({ link }: CommunityLinkProps) {
  const card = (
    <Card className="h-full transition-colors hover:bg-muted/60">
      <CardHeader>
        <CardTitle>{link.label}</CardTitle>
        <CardDescription>{link.description}</CardDescription>
      </CardHeader>
    </Card>
  );

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:no-underline">
      {card}
    </a>
  ) : (
    <Link href={link.href} className="hover:no-underline">
      {card}
    </Link>
  );
}
