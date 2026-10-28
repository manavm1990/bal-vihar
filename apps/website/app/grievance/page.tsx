import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import GrievanceForm from "./components/form/client";

const TITLE = "File a Grievance";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description: "File a grievance with the Bal Vihar of St. Louis Grievance Committee.",
};

export default function GrievancePage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <P>
        If you have a grievance, please fill out the form below. The grievance will be reviewed by
        the Grievance Committee and appropriate action will be taken.
      </P>
      <P>
        Not sure how grievances are handled? Read the{" "}
        <Link href="/about-us/policies-procedures#grievance">grievance policy</Link>.
      </P>
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <GrievanceForm />
        </CardContent>
      </Card>
    </Article>
  );
}
