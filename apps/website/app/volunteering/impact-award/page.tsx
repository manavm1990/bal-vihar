import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { ExternalIcon } from "@components/ui/icons";
import { H1, H2, H3, LeadP, MutedP, Ol, P, Strong, Table, Ul } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { cva } from "class-variance-authority";
import type { Metadata } from "next";

import AwardApplicationForm from "./components/form/award-application-form.client";
import {
  AWARD_AGE_GROUP_NOTE,
  AWARD_CONTACT,
  AWARD_DATES,
  AWARD_DOWNLOADS,
  AWARD_ELIGIBILITY,
  AWARD_STEPS,
  AWARD_TIERS,
  AWARD_YEAR,
  type AwardStep,
  type AwardTier,
  COMMUNITY_HOURS_INTRO,
  COMMUNITY_HOURS_TABLE,
  EVENT_HOURS_TEXT,
  OUTSIDE_HOURS_TEXT,
  TEACHING_HOURS_TABLE,
  TEACHING_REQUIREMENTS,
  VOLUNTEER_IDEAS,
  WHAT_HAPPENS_NEXT,
} from "./impact-award-content";

const PAGE_TITLE = "B-VISION Impact Award";

const SECTIONS = [
  { id: "who-can-apply", label: "Who can apply" },
  { id: "your-year", label: "Your award year" },
  { id: "awards", label: "Hours and awards" },
  { id: "hours", label: "How hours count" },
  { id: "tools", label: "Tracking sheet" },
  { id: "apply", label: "Apply" },
];

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${PAGE_TITLE}`,
  description:
    "Bal Vihar's award for youth volunteer hours: who can apply, how hours are counted, the Bronze, Silver and Gold levels, and how to apply.",
};

export default function ImpactAwardPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-6">
        <div className="space-y-2">
          <H1>{PAGE_TITLE}</H1>
          <LeadP>
            Bal Vihar's award for youth who give their time to the community. {AWARD_YEAR} award
            year.
          </LeadP>
        </div>
        <P>
          Service to mankind is service to God. Choose work you care about, do it because you
          believe in the cause, and Bal Vihar will recognize your hours.
        </P>
        <QuickFacts />
        <SectionNav />
      </header>

      <Eligibility />
      <Trail />
      <Tiers />
      <HoursDetails />
      <Downloads />
      <Apply />
    </article>
  );
}

function Apply() {
  return (
    <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-6 space-y-6">
      <H2 id="apply-heading">Apply</H2>

      <Card>
        <CardContent className="space-y-3 p-5">
          <P>
            Applications are due <Strong>{AWARD_DATES.apply}</Strong>. Upload your tracking log and
            all proof of service with your application. Nothing is accepted after this date, and
            there are no exceptions.
          </P>
          <AwardApplicationForm />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <H3>What happens next</H3>
        <Ul>
          {WHAT_HAPPENS_NEXT.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Ul>
      </div>

      <P>
        Questions? Contact <Strong>{AWARD_CONTACT.name}</Strong>, {AWARD_CONTACT.role}, at{" "}
        <a href={`mailto:${AWARD_CONTACT.email}`}>{AWARD_CONTACT.email}</a> or{" "}
        <a href={AWARD_CONTACT.phoneHref}>{AWARD_CONTACT.phone}</a>.
      </P>
    </section>
  );
}

function Downloads() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="scroll-mt-6 space-y-4">
      <H2 id="tools-heading">Tracking sheet and templates</H2>
      <ul className="bg-background divide-y rounded-lg border shadow-sm">
        {AWARD_DOWNLOADS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted/60 flex items-start justify-between gap-4 p-4 hover:no-underline"
            >
              <span className="space-y-1">
                <span className="text-foreground block font-semibold">{item.label}</span>
                <span className="text-muted-foreground block text-sm">{item.description}</span>
              </span>
              <ExternalIcon className="text-primary-700 mt-1 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Eligibility() {
  return (
    <section
      id="who-can-apply"
      aria-labelledby="who-can-apply-heading"
      className="scroll-mt-6 space-y-4"
    >
      <H2 id="who-can-apply-heading">Who can apply</H2>
      <Ul>
        {AWARD_ELIGIBILITY.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Ul>
      <P>
        Parents, please support your child. We encourage youth to contact the award team directly.
      </P>
    </section>
  );
}

interface FactProps {
  term: string;
  detail: string;
}

function Fact({ term, detail }: FactProps) {
  return (
    <div className="border-primary space-y-1 border-l-4 pl-4">
      <dt className="text-muted-foreground text-sm font-medium">{term}</dt>
      <dd className="font-eczar text-foreground text-3xl font-bold">{detail}</dd>
    </div>
  );
}

function HoursDetails() {
  return (
    <section id="hours" aria-labelledby="hours-heading" className="scroll-mt-6 space-y-4">
      <H2 id="hours-heading">How hours count</H2>
      <Accordion
        type="multiple"
        className="bg-background divide-y rounded-lg border px-5 py-2 shadow-sm"
      >
        <AccordionItem value="teaching">
          <AccordionTrigger>Teaching in the classroom (Y4 and Y5)</AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pr-4 sm:pr-12">
            <Ul>
              {TEACHING_REQUIREMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Ul>
            <Table
              headers={TEACHING_HOURS_TABLE.headers}
              rows={TEACHING_HOURS_TABLE.rows}
              footer={TEACHING_HOURS_TABLE.footer}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="community">
          <AccordionTrigger>Community service projects</AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pr-4 sm:pr-12">
            <P>{COMMUNITY_HOURS_INTRO}</P>
            <Table headers={COMMUNITY_HOURS_TABLE.headers} rows={COMMUNITY_HOURS_TABLE.rows} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="events">
          <AccordionTrigger>Bal Vihar events and logistics</AccordionTrigger>
          <AccordionContent className="text-foreground pr-4 sm:pr-12">
            <P>{EVENT_HOURS_TEXT}</P>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="outside">
          <AccordionTrigger>Service outside Bal Vihar</AccordionTrigger>
          <AccordionContent className="text-foreground pr-4 sm:pr-12">
            <P>{OUTSIDE_HOURS_TEXT}</P>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ideas">
          <AccordionTrigger>Ideas for finding service hours</AccordionTrigger>
          <AccordionContent className="text-foreground pr-4 sm:pr-12">
            <Ul className="md:columns-2 md:gap-x-8 [&>li]:break-inside-avoid">
              {VOLUNTEER_IDEAS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

function QuickFacts() {
  const [trackingSheet] = AWARD_DOWNLOADS;

  return (
    <div className="space-y-4">
      <dl className="grid gap-4 sm:grid-cols-3">
        <Fact term="Open to" detail="Youth in Y1–Y5" />
        <Fact
          term="Hours count from"
          detail={`${AWARD_DATES.trackingStart} – ${AWARD_DATES.trackingEnd}`}
        />
        <Fact term="Apply by" detail={AWARD_DATES.apply} />
      </dl>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href="#apply">Apply</a>
        </Button>
        {trackingSheet && (
          <Button asChild size="lg" variant="outline">
            <a href={trackingSheet.href} target="_blank" rel="noopener noreferrer">
              Tracking sheet
              <ExternalIcon className="ml-2 size-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

function SectionNav() {
  return (
    <nav aria-label="On this page">
      <ul className="flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="border-border text-navy-600 hover:bg-accent hover:text-primary-ink inline-block rounded-full border px-4 py-1.5 text-sm font-medium hover:no-underline"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface TierHoursProps {
  label: string;
  hours: string;
}

function TierHours({ label, hours }: TierHoursProps) {
  return (
    <div>
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="font-eczar text-foreground text-3xl font-bold">
        {hours}
        <span className="text-muted-foreground ml-1.5 font-sans text-sm font-normal">hours</span>
      </dd>
    </div>
  );
}

function Tiers() {
  return (
    <section id="awards" aria-labelledby="awards-heading" className="scroll-mt-6 space-y-4">
      <H2 id="awards-heading">Hours and awards</H2>
      <P>The hours you earn in the award year add up to a Bronze, Silver or Gold award.</P>
      <Ol variant="unstyled" className="grid gap-3 sm:grid-cols-3 sm:items-end">
        {AWARD_TIERS.map((tier) => (
          <TierStep key={tier.name} tier={tier} />
        ))}
      </Ol>
      <MutedP>{AWARD_AGE_GROUP_NOTE}</MutedP>
    </section>
  );
}

interface TierStepProps {
  tier: AwardTier;
}

function TierStep({ tier }: TierStepProps) {
  return (
    <li className={tierVariants({ tone: tier.tone })}>
      <H3>{tier.name}</H3>
      <dl className="space-y-3">
        <TierHours label="Teens (11–15)" hours={tier.teens} />
        <TierHours label="Young adults (16–25)" hours={tier.youngAdults} />
      </dl>
    </li>
  );
}

function Trail() {
  return (
    <section id="your-year" aria-labelledby="your-year-heading" className="scroll-mt-6 space-y-6">
      <H2 id="your-year-heading">Your award year</H2>
      <Ol
        variant="unstyled"
        className="before:bg-border relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px"
      >
        {AWARD_STEPS.map((step, index) => (
          <TrailStep key={step.key} step={step} number={index + 1} />
        ))}
      </Ol>
    </section>
  );
}

interface TrailStepProps {
  step: AwardStep;
  number: number;
}

function TrailStep({ step, number }: TrailStepProps) {
  return (
    <li className="relative grid grid-cols-[2rem_1fr] gap-x-4">
      <span
        aria-hidden="true"
        className="bg-secondary text-secondary-foreground relative z-10 grid size-8 place-items-center rounded-full text-sm font-semibold"
      >
        {number}
      </span>
      <div className="space-y-1">
        <p className="text-primary-ink text-sm font-semibold tracking-wide uppercase">
          {step.when}
        </p>
        <H3 className="text-xl">{step.title}</H3>
        <P className="text-muted-foreground">{step.body}</P>
        {step.details && (
          <Ul className="text-muted-foreground pt-1">
            {step.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </Ul>
        )}
      </div>
    </li>
  );
}

const tierVariants = cva("flex flex-col gap-4 rounded-lg border border-t-8 p-4 shadow-sm", {
  variants: {
    tone: {
      bronze: "bg-background border-t-primary-800 sm:min-h-48",
      gold: "bg-primary-50 border-t-primary-500 sm:min-h-64",
      silver: "bg-background border-t-gray-400 sm:min-h-56",
    },
  },
});
