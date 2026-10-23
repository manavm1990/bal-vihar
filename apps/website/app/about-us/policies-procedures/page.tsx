import PolicySection from "@components/policy-section";
import { H1, LeadP, MutedP } from "@components/ui/typography";
import { sanityFetch } from "@lib/sanity/live";
import { getPolicies } from "@lib/sanity/policies";
import { POLICIES_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT_US_TITLE } from "../constants";

const TITLE = "Policies & Procedures 📜";

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: "Bal Vihar Policies and Procedures",
};

export default async function PoliciesProceduresPage() {
  const result = await sanityFetch({ query: POLICIES_QUERY }).catch((error: unknown) => {
    console.error("Could not load the policies", error);
    return null;
  });
  const { intro, sections } = getPolicies(result?.data ?? null);

  return (
    <div className="space-y-8 [&_h5]:mt-2 [&_ul]:my-2">
      <H1>{TITLE}</H1>

      {intro && <LeadP>{intro}</LeadP>}

      {sections.length === 0 && (
        <MutedP>The policies are being updated. Please check back soon.</MutedP>
      )}

      <nav aria-label="Policy sections">
        <ul className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <li key={section.key}>
              <Link
                href={`#${section.slug}`}
                className="border-border text-navy-600 hover:bg-accent hover:text-primary-ink inline-block rounded-full border px-4 py-1.5 text-sm font-medium hover:no-underline"
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section, index) => (
        <PolicySection key={section.key} number={index + 1} section={section} />
      ))}
    </div>
  );
}
