import Article from "@components/article";
import { Card, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Community Projects`,
  description:
    "Service projects and cultural community activities for Bal Vihar students and families.",
};

const PROJECTS = [
  {
    name: "CANstruction",
    description: "Student-built canned-food structures supporting local hunger relief.",
  },
  {
    name: "Clothes Drive",
    description: "Seasonal clothing collections for community partners.",
  },
  {
    name: "Independence Day",
    description: "Community celebration and cultural programming around August 15.",
  },
  {
    name: "International Yoga Day",
    description: "School-wide yoga participation and wellness outreach.",
  },
  {
    name: "Walk for Water",
    description: "Awareness and fundraising walk tied to clean-water service goals.",
  },
  {
    name: "Food Drive",
    description: "Ongoing pantry support with partner organizations across St. Louis.",
  },
] as const;

export default function CommunityProjectsPage() {
  return (
    <Article title="Community Projects" className="md:columns-1">
      <P>
        Community service has been part of Bal Vihar since the beginning. Younger students join food
        and clothing drives; youth take on leadership roles with pantries, temple service, and
        interfaith partners. See also{" "}
        <Link href="/about-us/community-outreach">Community Outreach</Link> for partner history.
      </P>

      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Article>
  );
}
