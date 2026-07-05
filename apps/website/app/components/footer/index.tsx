import { ADMIN_OFFICE, ORGANIZATION_NAME, SCHOOL_LOCATION } from "@lib/constants";
import { MutedP, Small } from "../ui/typography";
import Links from "./links.client";

export default function Footer() {
  return (
    <footer className="space-y-4 border-t-2 border-t-slate-200 p-4 shadow-lg">
      <div className="grid gap-4 sm:grid-cols-2">
        <address className="not-italic">
          <Small className="block text-slate-700">School Location</Small>
          <MutedP className="mt-1 text-slate-500">
            {SCHOOL_LOCATION.name}
            <br />
            {SCHOOL_LOCATION.streetAddress}
            <br />
            {SCHOOL_LOCATION.addressLocality}, {SCHOOL_LOCATION.addressRegion}{" "}
            {SCHOOL_LOCATION.postalCode}
          </MutedP>
        </address>

        <address className="not-italic">
          <Small className="block text-slate-700">Administrative Office</Small>
          <MutedP className="mt-1 text-slate-500">
            {ADMIN_OFFICE.streetAddress}
            <br />
            {ADMIN_OFFICE.addressLocality}, {ADMIN_OFFICE.addressRegion} {ADMIN_OFFICE.postalCode}
            <br />
            <a href={`tel:${ADMIN_OFFICE.phoneHref}`}>{ADMIN_OFFICE.phoneDisplay}</a>
          </MutedP>
        </address>
      </div>

      <MutedP className="text-slate-500">
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
