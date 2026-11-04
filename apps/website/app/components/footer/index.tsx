import { ADMIN_OFFICE, ORGANIZATION_NAME, REGISTRATION_URL, SCHOOL_LOCATION } from "@lib/constants";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Small } from "../ui/typography";
import Links from "./links.client";

const LINK_CLASS_NAME = "text-primary underline-offset-4 hover:underline";

const QUICK_LINKS = [
  { href: "/new-families", label: "New families" },
  { href: "/about-us", label: "About us" },
  { href: "/education", label: "Programs" },
  { href: "/volunteering", label: "Volunteer" },
  { href: "/questions", label: "Contact" },
  { href: REGISTRATION_URL, label: "Enroll" },
] as const;

export default async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="bg-navy-900 mt-8 border-t-8 border-t-secondary p-6 text-white md:p-8">
      <div className="container grid gap-8 lg:grid-cols-[1.3fr_1fr_0.9fr]">
        <div className="space-y-3">
          <h2 className="font-display text-primary text-2xl leading-none">
            Bal Vihar of St. Louis
          </h2>
          <address className="not-italic text-sm text-navy-200">
            {SCHOOL_LOCATION.name}
            <br />
            {SCHOOL_LOCATION.streetAddress}
            <br />
            {SCHOOL_LOCATION.addressLocality}, {SCHOOL_LOCATION.addressRegion}{" "}
            {SCHOOL_LOCATION.postalCode}
            <br />
            <a
              href="https://maps.google.com/?q=Hindu+Temple+Community+Center+725+Weidman+Road+Ballwin+MO+63011"
              className={LINK_CLASS_NAME}
            >
              View map
            </a>
          </address>
          <p className="text-sm text-navy-200">Select Sundays, Aug–May, 10:00–12:30</p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl text-white">Contact</h2>
          <p className="text-sm text-navy-200">
            <a href="mailto:info@balviharstlouis.org" className={LINK_CLASS_NAME}>
              info@balviharstlouis.org
            </a>
          </p>
          <p className="text-sm text-navy-200">
            <a href={`tel:${ADMIN_OFFICE.phoneHref}`} className={LINK_CLASS_NAME}>
              {ADMIN_OFFICE.phoneDisplay}
            </a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl text-white">Quick links</h2>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASS_NAME}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-navy-200">
        <Links />

        <div className="space-y-4">
          <div className="space-y-1">
            <p>{ORGANIZATION_NAME} is a 501(c)(3) nonprofit organization.</p>
            <p>
              © {new Date().getFullYear()} {ORGANIZATION_NAME}. All rights reserved.
            </p>
          </div>

          <Small className="text-navy-300">
            Website creation & hosting provided voluntarily by:{" "}
            <a href="https://github.com/manavm1990" className={LINK_CLASS_NAME}>
              @manavm1990
            </a>
          </Small>
        </div>
      </div>
    </footer>
  );
}
