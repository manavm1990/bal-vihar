import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

import ExpenseForm from "./components/form/expense-form.client";

const TITLE = "Expense Reimbursement";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description: "Submit an expense for reimbursement from Bal Vihar of St. Louis.",
};

export default function ExpenseReimbursementPage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <P>
        Parents and volunteers who buy goods or services for approved Bal Vihar activities can
        submit the expense here. Please read the{" "}
        <Link href="/about-us/policies-procedures#expense">expense reimbursement policy</Link> first
        for the deadlines and the pre-approval requirement.
      </P>
      <Card className="w-full max-w-3xl">
        <CardContent className="p-5 sm:p-8">
          <ExpenseForm />
        </CardContent>
      </Card>
    </Article>
  );
}
