import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Admin Resources`,
  description: "Current-year admin resources for Bal Vihar of St. Louis.",
};

export default function AdminResourcesPage() {
  return (
    <Article title="Admin Resources" className="md:columns-1">
      <P>Documents and links for the administrative team.</P>
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
