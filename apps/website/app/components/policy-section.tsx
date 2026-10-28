import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Em, H3, H5, P, Strong, Table, Ul } from "@components/ui/typography";
import type { PolicyBody, PolicySectionView } from "@lib/sanity/policies";
import { stegaClean } from "@sanity/client/stega";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";

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
    // The schema's `policyTable` object guarantees this shape; Portable Text types `value` as `any`.
    policyTable: ({ value }) => <PolicyTable table={value as PolicyTableValue} />,
  },
};

interface PolicySectionProps {
  number: number;
  section: PolicySectionView;
}

export default function PolicySection({ number, section }: PolicySectionProps) {
  return (
    <section id={section.slug} className="scroll-mt-6 space-y-4">
      <H3>{`${number}.0 ${section.title}`}</H3>
      <PolicySectionBody number={number} section={section} />
    </section>
  );
}

export function PolicySectionBody({ number, section }: PolicySectionProps) {
  const { callToAction } = section;

  return (
    <div className="space-y-4">
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

export function PolicyText({ value }: PolicyTextProps) {
  return <PortableText value={value} components={POLICY_TEXT_COMPONENTS} />;
}
