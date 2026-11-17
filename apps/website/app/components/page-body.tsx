import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Em, H2, H3, Ol, P, Strong, Ul } from "@components/ui/typography";
import type { SanityImageValue } from "@lib/sanity/types";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import Callout from "./callout";
import InfoCard from "./info-card";
import { SanityImage } from "./sanity-image";
import SmartLink from "./smart-link";

type PageBodyValue = ComponentProps<typeof PortableText>["value"];

interface PageAccordionValue {
  items?: { _key: string; title?: string; body?: PageBodyValue }[];
}

interface PageButtonValue {
  label?: string;
  href?: string;
}

interface PageCalloutValue {
  title?: string;
  text?: string;
}

interface PageCardsValue {
  cards?: { _key: string; title?: string; text?: string; href?: string }[];
}

const PAGE_BODY_COMPONENTS: ComponentProps<typeof PortableText>["components"] = {
  block: {
    normal: ({ children }) => <P>{children}</P>,
    h2: ({ children }) => (
      <H2 variant="plain" className="text-2xl">
        {children}
      </H2>
    ),
    h3: ({ children }) => <H3 className="text-xl">{children}</H3>,
  },
  list: {
    bullet: ({ children }) => <Ul>{children}</Ul>,
    number: ({ children }) => <Ol>{children}</Ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <Strong>{children}</Strong>,
    em: ({ children }) => <Em>{children}</Em>,
    link: ({ children, value }) => (
      <SmartLink href={String(value?.href ?? "")}>{children}</SmartLink>
    ),
  },
  types: {
    // The schema's `mediaImage` type guarantees this shape; Portable Text types `value` as `any`.
    mediaImage: ({ value }) => <PageImage image={value as SanityImageValue} />,
    // The schema's `pageAccordion` type guarantees this shape; Portable Text types `value` as `any`.
    pageAccordion: ({ value }) => <PageAccordion accordion={value as PageAccordionValue} />,
    // The schema's `pageButton` type guarantees this shape; Portable Text types `value` as `any`.
    pageButton: ({ value }) => <PageButton button={value as PageButtonValue} />,
    // The schema's `pageCallout` type guarantees this shape; Portable Text types `value` as `any`.
    pageCallout: ({ value }) => <PageCallout callout={value as PageCalloutValue} />,
    // The schema's `pageCards` type guarantees this shape; Portable Text types `value` as `any`.
    pageCards: ({ value }) => <PageCards cards={value as PageCardsValue} />,
  },
};

interface PageBodyProps {
  value: PageBodyValue;
}

export default function PageBody({ value }: PageBodyProps) {
  return (
    <div className="space-y-4">
      <PortableText value={value} components={PAGE_BODY_COMPONENTS} />
    </div>
  );
}

interface PageAccordionProps {
  accordion: PageAccordionValue;
}

function PageAccordion({ accordion }: PageAccordionProps) {
  const items = (accordion.items ?? []).filter((item) => item.title);

  return items.length === 0 ? null : (
    <Accordion
      type="single"
      collapsible
      className="bg-background divide-y rounded-lg border px-5 py-2 shadow-sm"
    >
      {items.map((item) => (
        <AccordionItem key={item._key} value={item._key}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className="space-y-3 pr-4 sm:pr-12">
            <PortableText value={item.body ?? []} components={PAGE_BODY_COMPONENTS} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface PageButtonProps {
  button: PageButtonValue;
}

function PageButton({ button }: PageButtonProps) {
  return !button.label || !button.href ? null : (
    <Button asChild>
      <SmartLink href={button.href}>{button.label}</SmartLink>
    </Button>
  );
}

interface PageCalloutProps {
  callout: PageCalloutValue;
}

function PageCallout({ callout }: PageCalloutProps) {
  return !callout.title ? null : (
    <Callout title={callout.title}>
      <P className="whitespace-pre-line">{callout.text}</P>
    </Callout>
  );
}

interface PageCardsProps {
  cards: PageCardsValue;
}

function PageCards({ cards }: PageCardsProps) {
  const items = (cards.cards ?? []).filter((card) => card.title);

  return items.length === 0 ? null : (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((card) => (
        <li key={card._key} className="min-w-0">
          <InfoCard title={card.title ?? ""}>
            <P className="whitespace-pre-line">{card.text}</P>
            {card.href ? (
              <P>
                <SmartLink href={card.href}>Learn more</SmartLink>
              </P>
            ) : null}
          </InfoCard>
        </li>
      ))}
    </ul>
  );
}

interface PageImageProps {
  image: SanityImageValue;
}

function PageImage({ image }: PageImageProps) {
  return !image.asset ? null : (
    <figure className="space-y-2">
      <SanityImage
        value={image}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="h-auto w-full rounded-lg border"
      />
      {image.caption ? (
        <figcaption className="text-muted-foreground text-sm">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
