import SectionNav from "@components/section-nav";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { H1, H2, LeadP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Parent Hub";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Parent updates, class reminders, drop-off guidance, links to policies, and current-family resources for Bal Vihar families.",
};

const SECTIONS = {
  status: "Status board",
  calendar: "Upcoming dates",
  dropoff: "Drop-off & pickup",
  goodToKnow: "Good to know",
  policies: "Policies & practice",
  forms: "Forms & contacts",
} as const;

const STATUS_ITEMS = [
  "Class updates are posted before Sunday morning when a schedule changes.",
  "Check the calendar and class webpages before leaving home.",
  "If your child is unwell, please keep them home and contact the office if needed.",
] as const;

const GOOD_TO_KNOW = [
  "Snow days may move online or change the class plan; watch the calendar and communications.",
  "Parents of K and 1 students are picked up from the Parents' lounge.",
  "Students should come prepared with a notebook, mat, and any class materials listed for the week.",
  "If you need a concern handled, begin with the teacher and then follow the grievance steps.",
] as const;

export default function ParentsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <H1>{TITLE}</H1>
        <LeadP className="max-w-prose">
          The latest class information, drop-off guidance, and parent resources all in one place.
        </LeadP>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link href="/calendar">View the calendar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/new-families">New families guide</Link>
          </Button>
        </div>
      </header>

      <section className="bg-navy rounded-lg p-6 text-white">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="font-display text-primary text-3xl font-bold">Updated</p>
            <p className="mt-2 text-sm text-white/80">
              The class status board reflects the latest family update.
            </p>
          </div>
          <div>
            <p className="font-display text-primary text-3xl font-bold">Next class</p>
            <p className="mt-2 text-sm text-white/80">
              Check the calendar for the upcoming Sunday and any holiday changes.
            </p>
          </div>
          <div>
            <p className="font-display text-primary text-3xl font-bold">Parents' lounge</p>
            <p className="mt-2 text-sm text-white/80">
              K and 1 pickup happens there, and families should plan accordingly.
            </p>
          </div>
        </div>
      </section>

      <SectionNav
        label="On this page"
        links={Object.entries(SECTIONS).map(([id, title]) => ({ href: `#${id}`, title }))}
      />

      <section id="status" className="space-y-4">
        <H2 variant="plain">Status board</H2>
        <Card>
          <div className="grid gap-4 p-6 md:grid-cols-3">
            {STATUS_ITEMS.map((item) => (
              <div key={item} className="rounded-lg border p-4">
                <P className="text-sm leading-6">{item}</P>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="calendar" className="space-y-4">
        <H2 variant="plain">Upcoming dates</H2>
        <Card>
          <div className="space-y-3 p-6">
            <P>
              See the full schedule for class Sundays, holidays, celebrations, and other school-wide
              events.
            </P>
            <Button asChild variant="outline">
              <Link href="/calendar">Open the calendar</Link>
            </Button>
          </div>
        </Card>
      </section>

      <section id="dropoff" className="space-y-4">
        <H2 variant="plain">Drop-off & pickup</H2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Arrival</h3>
              <P>
                Use the side entrance and plan to arrive by the start of assembly. Families should
                be on time and ready to check in.
              </P>
            </div>
          </Card>
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Dismissal</h3>
              <P>
                All families should collect their children promptly at dismissal. K and 1 students
                are picked up from the Parents' lounge.
              </P>
            </div>
          </Card>
        </div>
      </section>

      <section id="goodToKnow" className="space-y-4">
        <H2 variant="plain">Good to know</H2>
        <Card>
          <ul className="space-y-3 p-6 text-sm leading-6">
            {GOOD_TO_KNOW.map((item) => (
              <li key={item} className="list-disc pl-5">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section id="policies" className="space-y-4">
        <H2 variant="plain">Policies & practice</H2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">School policies</h3>
              <P>
                Review school expectations, family responsibilities, and the standards our classes
                follow every Sunday.
              </P>
              <Link href="/about-us/policies-procedures" className="font-semibold">
                Read policies & procedures
              </Link>
            </div>
          </Card>
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Practice at home</h3>
              <P>
                Use the class webpages to review homework, bhajan notes, and study materials shared
                during the week.
              </P>
              <Link href="/education/class-webpages" className="font-semibold">
                Open class webpages
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section id="forms" className="space-y-4">
        <H2 variant="plain">Forms & contacts</H2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Disclaimer form</h3>
              <Link href="/disclaimer" className="font-semibold">
                Complete the disclaimer
              </Link>
            </div>
          </Card>
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Contact & FAQ</h3>
              <Link href="/questions" className="font-semibold">
                Ask a question
              </Link>
            </div>
          </Card>
          <Card>
            <div className="space-y-3 p-6">
              <h3 className="text-secondary text-lg font-semibold">Concerns</h3>
              <Link href="/grievance" className="font-semibold">
                Follow the grievance steps
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </article>
  );
}
