import Article from "@components/article";
import { Card, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Resources`,
  description: "Parent, student, faculty, and admin resource hubs for Bal Vihar of St. Louis.",
};

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

export default function ResourcesPage() {
  return (
    <Article title="Resources" className="md:columns-1">
      <P>
        Living documents for the current school year will be managed from Sanity over time. These
        hubs replace the legacy downloads dump with clear audience paths.
      </P>
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
    </Article>
  );
}
