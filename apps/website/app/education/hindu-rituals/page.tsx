import Article from "@components/article";
import MarkdownContent from "@components/markdown-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { H2 } from "@components/ui/typography";
import { HINDU_RITUALS, RITUAL_IMAGES, RITUALS } from "@lib/hindu-rituals-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = createStaticPageMetadata(HINDU_RITUALS);

export default function EducationHinduRitualsPage() {
  return (
    <Article title={HINDU_RITUALS.title} subtitle={HINDU_RITUALS.subtitle} className="md:columns-1">
      <div className="grid items-start gap-8 md:grid-cols-[20rem_1fr]">
        <Image
          src={RITUAL_IMAGES.arjunaKrishna}
          alt="Krishna shows Arjuna His universal form on the battlefield of Kurukshetra"
          sizes="(min-width: 768px) 20rem, 100vw"
          className="mx-auto h-auto w-full max-w-sm rounded-lg border md:max-w-none"
          priority
        />
        <div className="space-y-3">
          <MarkdownContent content={HINDU_RITUALS.content} />
        </div>
      </div>
      <section className="space-y-4">
        <H2>Why do we…</H2>
        <Accordion
          type="multiple"
          className="bg-background divide-y rounded-lg border px-5 py-2 shadow-sm"
        >
          {RITUALS.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{`${index + 1}. ${question}`}</AccordionTrigger>
              <AccordionContent className="space-y-3 pr-4 sm:pr-12">
                <MarkdownContent content={answer} images={RITUAL_IMAGES} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Article>
  );
}
