import Callout from "@components/callout";
import ContentSection from "@components/content-section";
import InfoCard from "@components/info-card";
import PagePhoto from "@components/page-photo";
import SectionNav from "@components/section-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { H1, H3, LeadP, P, Ul } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import VolunteerApplicationForm from "./form/client";

const TITLE = "Volunteering";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Why volunteering matters at Bal Vihar, and the education, event and administration roles where parents and youth can help, and how to apply.",
};

const ADMIN_TEAMS = [
  {
    title: "Operations",
    summary: "Plans and runs all Bal Vihar activities day to day.",
    roles: [
      "Secretary",
      "Parents coordination",
      "Volunteer coordination and management",
      "Logistics coordinator: takes the teaching material, AV aids and lost & found items to the storage facility",
      "Prasadam coordination",
    ],
  },
  {
    title: "Website",
    summary:
      "Designs and maintains the website, email lists and content. Website expertise is welcome, and parents with artistic skills can help with marketing.",
    roles: [
      "Website coordination",
      "Website content management",
      "Website development",
      "Marketing materials",
      "Marketing communications",
    ],
  },
  {
    title: "Events management",
    summary:
      "Plans and manages the events through the volunteers: organizes the meetings, communicates with parents, the education team and the rest of the administration team, and owns the budgets.",
    roles: [],
  },
  {
    title: "Fund raising",
    summary:
      "Fees cover educational expenses. Extra funds improve infrastructure, teaching aids and facilities for students.",
    roles: [
      "Short-term quick wins: sign-up programs with Schnucks, Dierbergs, Pizza Hut and others that donate part of each transaction to Bal Vihar",
      "Long-term big wins: write proposals and secure corporate and government funding",
    ],
  },
] as const;

const EVENTS = [
  {
    title: "Family Night",
    description:
      "Usually held in a school gym. Students, parents, teachers and their families socialize, dance to dandiya beats and play games.",
    tasks: [
      "Photography and video recording",
      "Reserve the event site well in advance, preferably 3–4 months, as most parks get booked early",
      "Arrange and set up games for kids",
      "Food arrangements and distribution",
      "Cleaning, by all the volunteers",
    ],
  },
  {
    title: "Diwali",
    description:
      "A major Bal Vihar celebration, usually with 3–4 event coordinators and 20 parent volunteers. It begins with class photos of all students, then pooja at the temple, prasad and/or dinner, and fireworks.",
    tasks: [
      "Purchase pooja materials",
      "Plan and run the Diwali pooja at the Hindu Temple",
      "Plan, purchase, distribute and monitor fireworks",
      "Photography and video recording",
      "Plan and organize prasad and dinner",
      "Clean up",
    ],
  },
  {
    title: "Holi",
    description:
      "Held in spring. It starts with a quick lunch for kids, and children play with colors after a short presentation or play.",
    tasks: [
      "Photography and video recording",
      "Coordinate and buy colors, packaging and distribution",
      "Food arrangements and distribution",
      "Clean and protect the MGC and Hindu Temple building from color and dirt",
    ],
  },
  {
    title: "Annual Day",
    description:
      "The Bal Vihar year ends with Annual Day, where almost everyone takes part. Preparation starts at least 5–6 months ahead: teachers propose a theme, most groups perform around what they learned, and rehearsals start a few weeks before so the regular curriculum isn’t disrupted. Graduating students receive certificates, teachers and volunteers are recognized, and a chief guest usually gives a short speech about students or culture.",
    tasks: [
      "Two leads",
      "Photography and video taping",
      "Put the program together with the teachers from each group, Yoga and Bhajans, and arrange the MC",
      "Manage the sound system and AV equipment",
      "Advertise, create, print and distribute the program souvenir",
      "Arrange, escort and look after the food needs of the chief guest or guests (one volunteer)",
      "Prepare the stage, set up, clean and arrange seating, usually the day before or early that morning",
      "Order, deliver, set up and distribute food",
      "Cleaning and wrap-up",
    ],
  },
] as const;

const SECTIONS = {
  teaching: "Education and teaching",
  events: "Events",
  administration: "Administration",
  apply: "Apply to volunteer",
} as const;

const TEACHING_ROLES = [
  "Teachers for Groups 1 to Y3",
  "Bhajans and prayers",
  "Yoga",
  "Community service",
  "Arts and crafts",
  "Classroom parents",
] as const;

const WAYS_TO_HELP = [
  {
    title: "Teach",
    text: "Share culture, religion or history with a class. No teaching experience needed.",
    href: "#teaching",
    linkLabel: "Teaching roles",
  },
  {
    title: "Run an event",
    text: "Picnic, Diwali, Holi, Republic Day, Annual Day and Family Night are all run by parent volunteers.",
    href: "#events",
    linkLabel: "Event roles",
  },
  {
    title: "Join the administration team",
    text: "After a few years at Bal Vihar, help with operations, the website, events management or fund raising.",
    href: "#administration",
    linkLabel: "Administration roles",
  },
  {
    title: "Youth service",
    text: "Youth group students volunteer too, and can earn recognition for their hours.",
    href: "/volunteering/impact-award",
    linkLabel: "B-VISION Impact Award",
  },
] as const;

export default function VolunteeringPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <H1>{TITLE}</H1>
        <LeadP className="max-w-prose">
          Bal Vihar is a non-profit run entirely by community volunteers, and all parents are
          expected to share the workload. That is what lets us run effectively and efficiently.
        </LeadP>
        <P className="max-w-prose">
          Parents volunteer for many reasons, especially to help kids learn our culture and
          celebrate our major events. Volunteering has long been seen as a form of charity, giving
          back to your community, and it benefits you too, including learning something about
          yourself. Parents and youth group students can both volunteer, and no volunteer is paid.
        </P>
        <Button asChild>
          <a href="#apply">Apply to volunteer</a>
        </Button>
      </header>

      <PagePhoto path="/volunteering" />

      <section aria-labelledby="ways-heading" className="space-y-6">
        <h2 id="ways-heading" className="sr-only">
          Ways to help
        </h2>
        <Ul variant="unstyled" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS_TO_HELP.map((way) => (
            <li key={way.title}>
              <Card className="flex h-full flex-col gap-3 p-5">
                <H3 className="text-xl">{way.title}</H3>
                <P className="flex-1">{way.text}</P>
                <Link href={way.href} className="font-medium">
                  {way.linkLabel}
                </Link>
              </Card>
            </li>
          ))}
        </Ul>
      </section>

      <SectionNav
        label="On this page"
        links={Object.entries(SECTIONS).map(([id, title]) => ({ href: `#${id}`, title }))}
      />

      <Section id="teaching">
        <P className="max-w-prose">
          The success of Bal Vihar depends on the quality and delivery of the curriculum, and on
          enthusiastic, cooperative, professional teaching volunteers. We keep classes to at most 25
          students and sometimes split a class that grows larger, so as enrollment and our offerings
          grow, we look for more teachers.
        </P>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="Roles we need">
            <Ul>
              {TEACHING_ROLES.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </Ul>
          </InfoCard>
          <InfoCard title="What to expect">
            <Ul>
              <li>
                No prior teaching experience is needed. The curriculum is well designed, and
                newcomers are paired with an experienced teacher for their first year.
              </li>
              <li>Experienced teachers can take a lead role the following year.</li>
              <li>
                Teaching is a year-long commitment, with one summer session and two teachers’
                meetings during the year.
              </li>
            </Ul>
          </InfoCard>
        </div>
        <Button asChild variant="outline">
          <Link href="/questions">Contact the education team</Link>
        </Button>
      </Section>

      <Section id="events">
        <P className="max-w-prose">
          Every event is planned and run by parent volunteers. Each one has a parent lead, and a
          team of parents takes on its activities. Event descriptions are on the{" "}
          <Link href="/calendar">calendar</Link>.
        </P>
        <Accordion type="multiple" className="divide-y rounded-lg border p-5 shadow-sm">
          {EVENTS.map((event) => (
            <AccordionItem key={event.title} value={event.title}>
              <AccordionTrigger>{event.title}</AccordionTrigger>
              <AccordionContent className="text-foreground space-y-3">
                <P>{event.description}</P>
                <Ul>
                  {event.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </Ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button asChild variant="outline">
          <Link href="/questions">Contact the events team</Link>
        </Button>
      </Section>

      <Section id="administration">
        <P className="max-w-prose">
          After a few years at Bal Vihar, you can get more involved through the administration team.
        </P>
        <div className="grid gap-4 md:grid-cols-2">
          {ADMIN_TEAMS.map((team) => (
            <InfoCard key={team.title} title={team.title}>
              <P>{team.summary}</P>
              {team.roles.length > 0 && (
                <Ul>
                  {team.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </Ul>
              )}
            </InfoCard>
          ))}
        </div>
        <P className="max-w-prose">
          Interested in a position? Contact a member of the{" "}
          <Link href="/about-us/administrative-team">administrative team</Link> or use the{" "}
          <Link href="/questions">contact form</Link>.
        </P>
      </Section>

      <Section id="apply">
        <Callout title="Before you apply">
          <P>
            Tell us where you would like to help and a member of the volunteer team will be in
            touch. Not sure yet? Sign up anyway and we will call on you when help is needed. Please
            read the <Link href="/about-us/policies-procedures#volunteer">volunteer policies</Link>{" "}
            first.
          </P>
        </Callout>
        <VolunteerApplicationForm />
        <P>
          Meet the <Link href="/volunteering/volunteers">volunteers</Link> who make Bal Vihar
          possible.
        </P>
      </Section>
    </article>
  );
}

interface SectionProps {
  id: keyof typeof SECTIONS;
  children: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
  return (
    <ContentSection id={id} title={SECTIONS[id]}>
      {children}
    </ContentSection>
  );
}
