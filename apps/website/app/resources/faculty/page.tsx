import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Faculty Resources`,
  description: "Current-year faculty resources for Bal Vihar of St. Louis.",
};

export default function FacultyResourcesPage() {
  return (
    <Article title="Faculty Resources" className="md:columns-1">
      <P>
        This hub will list current-year documents and links for faculty. Prefer a small set of
        living files over the legacy multi-year downloads archive.
      </P>
      <Card>
        <CardContent className="space-y-2 p-4">
          <MutedP>
            No documents seeded yet. When Sanity resource documents are added, they will appear
            here. Meanwhile see{" "}
            <Link href="/about-us/policies-procedures">Policies &amp; Procedures</Link>,{" "}
            <Link href="/calendar">Calendar</Link>, and <Link href="/questions">Contact</Link>.
          </MutedP>
        </CardContent>
      </Card>
    </Article>
  );
}
