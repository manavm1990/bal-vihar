"use client";

import { Button } from "@components/ui/button";
import { H1, LeadP, P } from "@components/ui/typography";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="mx-auto max-w-prose space-y-6 py-8">
      <H1>Something went wrong</H1>
      <LeadP>The page could not be loaded. You can try again or head home.</LeadP>
      {error.digest ? (
        <P className="text-muted-foreground text-sm">Reference: {error.digest}</P>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/questions#contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
