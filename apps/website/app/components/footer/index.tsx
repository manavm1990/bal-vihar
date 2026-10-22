import { ADMIN_OFFICE, ORGANIZATION_NAME, SCHOOL_LOCATION } from "@lib/constants";
import { MutedP, Small } from "../ui/typography";
import Links from "./links.client";

export default function Footer() {
  return (
    <footer className="border-t-secondary bg-gray-50 mt-8 space-y-4 border-t-8 p-6">
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
