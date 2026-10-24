import { ADMIN_OFFICE, ORGANIZATION_NAME, SCHOOL_LOCATION } from "@lib/constants";
import { cacheLife } from "next/cache";
import Link from "next/link";

import { MutedP, Small } from "../ui/typography";
import Links from "./links.client";

const PRIMARY_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/admissions", label: "Admissions" },
  { href: "/education", label: "Education" },
  { href: "/calendar", label: "Events" },
  { href: "/volunteering", label: "Get Involved" },
  { href: "/questions", label: "Contact" },
] as const;

export default async function Footer() {
  // The copyright year only needs to be right once a day.
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t-secondary bg-gray-50 mt-8 space-y-4 border-t-8 p-6">
      <nav aria-label="Primary" className="border-border border-b pb-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-4 sm:grid-cols-2">
        <address className="not-italic">
          <Small className="block text-foreground">School Location</Small>
          <MutedP className="mt-1 text-muted-foreground">
            {SCHOOL_LOCATION.name}
            <br />
            {SCHOOL_LOCATION.streetAddress}
            <br />
            {SCHOOL_LOCATION.addressLocality}, {SCHOOL_LOCATION.addressRegion}{" "}
            {SCHOOL_LOCATION.postalCode}
          </MutedP>
        </address>

        <address className="not-italic">
          <Small className="block text-foreground">Administrative Office</Small>
          <MutedP className="mt-1 text-muted-foreground">
            {ADMIN_OFFICE.streetAddress}
            <br />
            {ADMIN_OFFICE.addressLocality}, {ADMIN_OFFICE.addressRegion} {ADMIN_OFFICE.postalCode}
            <br />
            <a href={`tel:${ADMIN_OFFICE.phoneHref}`}>{ADMIN_OFFICE.phoneDisplay}</a>
          </MutedP>
        </address>
      </div>

      <MutedP className="text-muted-foreground">
        © {new Date().getFullYear()} {ORGANIZATION_NAME} All rights reserved.
      </MutedP>
      <Small>
        Website Creation & Hosting Services Provided by:{" "}
        <a href="https://github.com/manavm1990">@manavm1990</a>
      </Small>

      <Links />
    </footer>
  );
}
