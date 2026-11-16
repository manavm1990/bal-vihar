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
import {
  type AwardDates,
  type AwardDownload,
  type AwardTier,
  fetchImpactAward,
  type ImpactAwardView,
  TO_BE_ANNOUNCED,
} from "@lib/sanity/impact-award";
import { cn } from "@lib/utils";
import { cva } from "class-variance-authority";
import type { Metadata } from "next";
import AwardApplicationForm from "./form/client";
import {
  AWARD_AGE_GROUP_NOTE,
  type AwardStep,
  COMMUNITY_HOURS_HEADERS,
  EVENT_HOURS_TEXT,
  getAwardEligibility,
  getAwardSteps,
  getWhatHappensNext,
  OUTSIDE_HOURS_TEXT,
  TEACHING_HOURS_FOOTER,
  TEACHING_HOURS_HEADERS,
  TEACHING_REQUIREMENTS,
  VOLUNTEER_IDEAS,
} from "./impact-award-content";

const PAGE_TITLE = "B-VISION Impact Award";
const SECTIONS = [
  { id: "who-can-apply", label: "Who can apply" },
  { id: "your-year", label: "Your award year" },
  { id: "awards", label: "Hours and awards" },
  { id: "hours", label: "How hours count" },
  { id: "tools", label: "Tracking sheet" },
  { id: "apply", label: "Apply" },
] as const;

const tierVariants = cva("flex flex-col gap-4 rounded-lg border border-t-8 p-4 shadow-sm", {
  variants: {
    tone: {
      bronze: "bg-background border-t-primary-800 sm:min-h-48",
      gold: "bg-primary-50 border-t-primary-500 sm:min-h-64",
      silver: "bg-background border-t-gray-400 sm:min-h-56",
    },
  },
});

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${PAGE_TITLE}`,
  description:
    "Bal Vihar's award for youth volunteer hours: who can apply, how hours are counted, the Bronze, Silver and Gold levels, and how to apply.",
};

export default async function ImpactAwardPage() {
  const award = await fetchImpactAward();

  return (
    <article className="space-y-12">
      <header className="space-y-6">
        <div className="space-y-2">
          <H1>{PAGE_TITLE}</H1>
          <LeadP>
            Bal Vihar's award for youth who give their time to the community.
            {award.year ? ` ${award.year} award year.` : ""}
          </LeadP>
        </div>
        <P>
          Service to mankind is service to God. Choose work you care about, do it because you
          believe in the cause, and Bal Vihar will recognize your hours.
        </P>
        <QuickFacts award={award} />
        <SectionNav hasDownloads={award.downloads.length > 0} />
      </header>

      <Eligibility dates={award.dates} />
      <Trail dates={award.dates} />
      <Tiers tiers={award.tiers} />
      <HoursDetails award={award} />
      <Downloads downloads={award.downloads} />
      <Apply award={award} />
    </article>
  );
}

interface ApplyProps {
  award: ImpactAwardView;
}

function Apply({ award }: ApplyProps) {
  const { contact, dates } = award;

  return (
    <Section id="apply" title="Apply" className="space-y-6">
      <Card>
        <CardContent className="space-y-3 p-5">
          <P>
            {dates.apply ? (
              <>
                Applications are due <Strong>{dates.apply}</Strong>.{" "}
              </>
            ) : (
              "The application deadline will be announced. "
            )}
            Upload your tracking log and all proof of service with your application. Nothing is
            accepted after the deadline, and there are no exceptions.
          </P>
          <AwardApplicationForm />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <H3>What happens next</H3>
        <TextList items={getWhatHappensNext(dates)} />
      </div>

      {contact ? (
        <P>
          Questions? Contact <Strong>{contact.name}</Strong>
          {contact.role ? `, ${contact.role}` : ""}
          {contact.email ? (
            <>
              , at <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          ) : null}
          {contact.phone && contact.phoneHref ? (
            <>
              {contact.email ? " or " : ", at "}
              <a href={contact.phoneHref}>{contact.phone}</a>
            </>
          ) : null}
          .
        </P>
      ) : null}
    </Section>
  );
}

interface DownloadsProps {
  downloads: AwardDownload[];
}

function Downloads({ downloads }: DownloadsProps) {
  return downloads.length === 0 ? null : (
    <Section id="tools" title="Tracking sheet and templates">
      <ul className="bg-background divide-y rounded-lg border shadow-sm">
        {downloads.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted/60 flex items-start justify-between gap-4 p-4 hover:no-underline"
            >
              <span className="space-y-1">
                <span className="text-foreground block font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="text-muted-foreground block text-sm">{item.description}</span>
                ) : null}
              </span>
              <ExternalIcon className="text-primary-700 mt-1 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

interface EligibilityProps {
  dates: AwardDates;
}

function Eligibility({ dates }: EligibilityProps) {
  return (
    <Section id="who-can-apply" title="Who can apply">
      <TextList items={getAwardEligibility(dates)} />
      <P>
        Parents, please support your child. We encourage youth to contact the award team directly.
      </P>
    </Section>
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
      <dd className="font-display text-foreground text-3xl font-bold">{detail}</dd>
    </div>
  );
}

interface HoursDetailsProps {
  award: ImpactAwardView;
}

function HoursDetails({ award }: HoursDetailsProps) {
  return (
    <Section id="hours" title="How hours count">
      <Accordion
        type="multiple"
        className="bg-background divide-y rounded-lg border px-5 py-2 shadow-sm"
      >
        <HoursItem
          value="teaching"
          title="Teaching in the classroom (Y4 and Y5)"
          className="space-y-3"
        >
          <TextList items={TEACHING_REQUIREMENTS} />
          {award.teachingHours.length === 0 ? (
            <MutedP>The hours for each activity will be announced.</MutedP>
          ) : (
            <Table
              headers={[...TEACHING_HOURS_HEADERS]}
              rows={award.teachingHours}
              footer={TEACHING_HOURS_FOOTER}
            />
          )}
        </HoursItem>

        <HoursItem value="community" title="Community service projects" className="space-y-3">
          {award.communityIntro ? <P>{award.communityIntro}</P> : null}
          {award.communityProjects.length === 0 ? (
            <MutedP>This year's projects and their hours will be announced.</MutedP>
          ) : (
            <Table headers={[...COMMUNITY_HOURS_HEADERS]} rows={award.communityProjects} />
          )}
        </HoursItem>

        <HoursItem value="events" title="Bal Vihar events and logistics">
          <P>{EVENT_HOURS_TEXT}</P>
        </HoursItem>

        <HoursItem value="outside" title="Service outside Bal Vihar">
          <P>{OUTSIDE_HOURS_TEXT}</P>
        </HoursItem>

        <HoursItem value="ideas" title="Ideas for finding service hours">
          <TextList
            items={VOLUNTEER_IDEAS}
            className="md:columns-2 md:gap-x-8 [&>li]:break-inside-avoid"
          />
        </HoursItem>
      </Accordion>
    </Section>
  );
}

interface HoursItemProps {
  value: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

function HoursItem({ value, title, className, children }: HoursItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className={cn("text-foreground pr-4 sm:pr-12", className)}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

interface QuickFactsProps {
  award: ImpactAwardView;
}

function QuickFacts({ award }: QuickFactsProps) {
  const { dates } = award;
  const [trackingSheet] = award.downloads;

  return (
    <div className="space-y-4">
      <dl className="grid gap-4 sm:grid-cols-3">
        <Fact term="Open to" detail="Youth in Y1–Y5" />
        <Fact
          term="Hours count from"
          detail={
            dates.trackingStart && dates.trackingEnd
              ? `${dates.trackingStart} – ${dates.trackingEnd}`
              : TO_BE_ANNOUNCED
          }
        />
        <Fact term="Apply by" detail={dates.apply ?? TO_BE_ANNOUNCED} />
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

interface SectionProps {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

function Section({ id, title, className = "space-y-4", children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("scroll-mt-6", className)}>
      <H2 id={`${id}-heading`}>{title}</H2>
      {children}
    </section>
  );
}

interface SectionNavProps {
  hasDownloads: boolean;
}

function SectionNav({ hasDownloads }: SectionNavProps) {
  return (
    <nav aria-label="On this page">
      <ul className="flex flex-wrap gap-2">
        {SECTIONS.filter((section) => hasDownloads || section.id !== "tools").map((section) => (
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

interface TextListProps {
  items: readonly string[];
  className?: string;
}

function TextList({ items, className }: TextListProps) {
  return (
    <Ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Ul>
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
      <dd className="font-display text-foreground text-3xl font-bold">
        {hours}
        <span className="text-muted-foreground ml-1.5 font-sans text-sm font-normal">hours</span>
      </dd>
    </div>
  );
}

interface TiersProps {
  tiers: AwardTier[];
}

function Tiers({ tiers }: TiersProps) {
  return (
    <Section id="awards" title="Hours and awards">
      <P>The hours you earn in the award year add up to a Bronze, Silver or Gold award.</P>
      {tiers.length === 0 ? (
        <MutedP>The hours for each level will be announced.</MutedP>
      ) : (
        <Ol variant="unstyled" className="grid gap-3 sm:grid-cols-3 sm:items-end">
          {tiers.map((tier) => (
            <TierStep key={tier.name} tier={tier} />
          ))}
        </Ol>
      )}
      <MutedP>{AWARD_AGE_GROUP_NOTE}</MutedP>
    </Section>
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
        <TierHours label="Young adults (16–18)" hours={tier.youngAdults} />
      </dl>
    </li>
  );
}

interface TrailProps {
  dates: AwardDates;
}

function Trail({ dates }: TrailProps) {
  return (
    <Section id="your-year" title="Your award year" className="space-y-6">
      <Ol
        variant="unstyled"
        className="before:bg-border relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px"
      >
        {getAwardSteps(dates).map((step, index) => (
          <TrailStep key={step.key} step={step} number={index + 1} />
        ))}
      </Ol>
    </Section>
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
        {step.details && <TextList items={step.details} className="text-muted-foreground pt-1" />}
      </div>
    </li>
  );
}
