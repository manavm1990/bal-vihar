import { Button } from "@components/ui/button";
import { H1, LeadP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Page not found`,
  description: "The page you requested could not be found.",
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/admissions", label: "Admissions" },
  { href: "/calendar", label: "Calendar" },
  { href: "/questions", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose space-y-6 py-8">
      <H1>Page not found</H1>
      <LeadP>
        That address is not on this site. Try one of these pages, or use the menu above.
      </LeadP>
      <div className="flex flex-wrap gap-3">
        {LINKS.map((link) => (
          <Button key={link.href} asChild variant={link.href === "/" ? "default" : "outline"}>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
