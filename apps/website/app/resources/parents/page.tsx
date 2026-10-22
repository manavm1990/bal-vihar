import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Parents Resources`,
  description: "Current-year parents resources for Bal Vihar of St. Louis.",
};

export default function ParentsResourcesPage() {
  return (
    <Article title="Parents Resources" className="md:columns-1">
      <P>Documents and links for parents.</P>
      <Card>
        <CardContent className="space-y-2 p-4">
          <MutedP>
            Looking for something specific? See{" "}
            <Link href="/about-us/policies-procedures">Policies &amp; Procedures</Link>,{" "}
            <Link href="/calendar">Calendar</Link>, and <Link href="/questions">Contact</Link>.
          </MutedP>
        </CardContent>
      </Card>
    </Article>
  );
}
