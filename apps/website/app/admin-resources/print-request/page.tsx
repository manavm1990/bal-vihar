import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import PrintRequestForm from "./components/form/client";

const TITLE = "Print Request";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description: "Request a print job from Bal Vihar of St. Louis.",
  robots: { index: false },
};

export default function PrintRequestPage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <P>
        Teachers and administrative staff can use this form to request copies of worksheets,
        handouts and other materials. Please allow time before the due date for the job to be
        completed.
      </P>
      <Card className="w-full max-w-3xl">
        <CardContent className="p-5 sm:p-8">
          <PrintRequestForm />
        </CardContent>
      </Card>
    </Article>
  );
}
