import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Em, H1, H3, H5, LeadP, MutedP, P, Strong, Table, Ul } from "@components/ui/typography";
import { sanityFetch } from "@lib/sanity/live";
import { getPolicies, type PolicyBody, type PolicySectionView } from "@lib/sanity/policies";
import { POLICIES_QUERY } from "@lib/sanity/queries";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import { ABOUT_US_TITLE } from "../constants";

interface PolicyTableValue {
  headers?: string[];
  rows?: { cells?: string[] }[];
  footer?: string;
}

const POLICY_TEXT_COMPONENTS: ComponentProps<typeof PortableText>["components"] = {
  block: {
    normal: ({ children }) => <P>{children}</P>,
    h5: ({ children }) => <H5>{children}</H5>,
  },
  list: {
    bullet: ({ children }) => <Ul>{children}</Ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <Strong>{children}</Strong>,
    em: ({ children }) => <Em>{children}</Em>,
    link: ({ children, value }) => (
      <PolicyLink href={String(value?.href ?? "")}>{children}</PolicyLink>
    ),
  },
  types: {
    policyTable: ({ value }) => <PolicyTable table={value as PolicyTableValue} />,
  },
};

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

interface PolicyLinkProps {
  href: string;
  children: React.ReactNode;
}

function PolicyLink({ href, children }: PolicyLinkProps) {
  const cleanHref = stegaClean(href);

  return cleanHref.startsWith("/") || cleanHref.startsWith("#") ? (
    <Link href={cleanHref}>{children}</Link>
  ) : (
    <a href={cleanHref} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

interface PolicySectionProps {
  number: number;
  section: PolicySectionView;
}

function PolicySection({ number, section }: PolicySectionProps) {
  const { callToAction } = section;

  return (
    <section id={section.slug} className="scroll-mt-6 space-y-4">
      <H3>{`${number}.0 ${section.title}`}</H3>

      <PolicyText value={section.intro} />

      <Accordion
        type="single"
        collapsible
        className="bg-background divide-y rounded-lg border px-5 py-2 shadow-sm"
      >
        {section.items.map((item, index) => (
          <AccordionItem key={item.key} value={item.key}>
            <AccordionTrigger>{`${number}.${index + 1} ${item.title}`}</AccordionTrigger>
            <AccordionContent className="space-y-3 pr-4 sm:pr-12">
              <PolicyText value={item.body} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {callToAction && (
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            {callToAction.text && (
              <p className="text-foreground font-medium">{callToAction.text}</p>
            )}
            <Button asChild>
              <Link href={callToAction.href}>{callToAction.label}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

interface PolicyTableProps {
  table: PolicyTableValue;
}

function PolicyTable({ table }: PolicyTableProps) {
  return (
    <Table
      headers={table.headers ?? []}
      rows={(table.rows ?? []).map((row) => row.cells ?? [])}
      footer={table.footer}
    />
  );
}

interface PolicyTextProps {
  value: PolicyBody;
}

/** Renders a policy's Portable Text body with the site's typography primitives. */
function PolicyText({ value }: PolicyTextProps) {
  return <PortableText value={value} components={POLICY_TEXT_COMPONENTS} />;
}
