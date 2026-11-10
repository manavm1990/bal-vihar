import SectionNav from "@components/section-nav";
import TypicalSunday from "@components/typical-sunday";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { H1, H2, H3, LeadP, P, Ul } from "@components/ui/typography";
import { BASE_TITLE, SUNDAY_BRING_ITEMS } from "@lib/constants";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "New Families";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Everything new Bal Vihar families need: what a Sunday looks like, drop-off and pick-up, what to bring, and who to ask.",
};

const EVENTS = [
  "Diwali",
  "Holi",
  "Picnic and Family Night",
  "Republic Day",
  "Variety Show",
] as const;

const GROUND_RULES = [
  {
    title: "In class",
    rules: [
      "Enter quietly and with a smile.",
      "No side talk during class.",
      "Stay for the Aarti and prasad.",
    ],
  },
  {
    title: "Around the school",
    rules: [
      "Move between the classroom and the Yoga room or Gymnasium in an orderly way. No running.",
      "Keep the hall and classroom clean, and clean up any mess you see.",
    ],
  },
  {
    title: "Clothing",
    rules: [
      "Children sit cross-legged, so girls should preferably wear long dresses.",
      "No gym clothes or tight clothes.",
    ],
  },
  {
    title: "Folders and updates",
    rules: [
      "Returning students reuse last year’s class folder. New students get a new folder, and everyone gets a student packet at the start of the year.",
      "Schedule changes are posted on the website by 8 a.m. on class day.",
    ],
  },
] as const;

const SECTIONS = {
  sunday: "Your Sunday",
  arrival: "Arrival and pick-up",
  bring: "What to bring",
  "ground-rules": "Ground rules",
  support: "Supporting your child",
  health: "Health and special needs",
  learn: "What children learn",
  "yoga-bhajan": "Yoga and Bhajan",
  concerns: "If you have a concern",
  events: "Events",
  contact: "Staying in touch",
} as const;

const YOGA_WEAR_ITEMS = [
  "Loose, comfortable clothes",
  "No jeans, belts, necklaces and the like",
  "Shorts or tights under a skirt or dress",
] as const;

export default function NewFamiliesPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <H1>{TITLE}</H1>
        <LeadP className="max-w-prose">
          Everything you need before your first Sunday: what the day looks like, what to bring, how
          drop-off and pick-up work, and who to ask.
        </LeadP>
        <P className="max-w-prose">
          Bal Vihar of St. Louis admits any student aged 5 through 18, regardless of their
          background, and expects all to abide by the{" "}
          <Link href="/about-us/policies-procedures">policies and procedures</Link>. Before the
          school year, parents complete the <Link href="/disclaimer">disclaimer form</Link>.
        </P>
      </header>

      <SectionNav
        label="On this page"
        links={Object.entries(SECTIONS).map(([id, title]) => ({ href: `#${id}`, title }))}
      />

      <Section id="sunday">
        <P>
          August to May, with breaks and some back-to-back Sundays. Check the{" "}
          <Link href="/calendar">calendar</Link>.
        </P>
        <TypicalSunday />
        <Button asChild variant="outline">
          <Link href="/education/class-schedule#where-to-go">Find your group’s rooms</Link>
        </Button>
      </Section>

      <Section id="arrival">
        <P>Your child’s safety is important to us.</P>
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="Running late">
            Late arrivals wait in the common area and join their class after Aarti.
          </InfoCard>
          <InfoCard title="Pick-up">
            All dismissals are at the side entrance, except Groups K and 1, who are picked up from
            the Parents’ lounge. Everyone must be collected on time, no exceptions.
          </InfoCard>
          <InfoCard title="Leaving early">
            Email the teacher the night before, or send a note with your child.
          </InfoCard>
        </div>
        <Callout title="Bad weather and snow days">
          <P>
            Check the website or call your child’s teacher before heading out. Snow days convert to
            Zoom sessions so classes stay connected.
          </P>
        </Callout>
      </Section>

      <Section id="bring">
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="In the backpack">
            <CheckList items={SUNDAY_BRING_ITEMS} />
          </InfoCard>
          <InfoCard title="What to wear for yoga">
            <CheckList items={YOGA_WEAR_ITEMS} />
          </InfoCard>
        </div>
      </Section>

      <Section id="ground-rules">
        <P>
          Parents are asked to help students follow these rules so Bal Vihar stays a truly
          educational place.
        </P>
        <div className="grid gap-4 sm:grid-cols-2">
          {GROUND_RULES.map((group) => (
            <InfoCard key={group.title} title={group.title}>
              <Ul>
                {group.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </Ul>
            </InfoCard>
          ))}
        </div>
        <Button asChild variant="outline">
          <Link href="/about-us/policies-procedures#school-requirements">
            Read the full School Requirements policy
          </Link>
        </Button>
      </Section>

      <Section id="support">
        <Ul>
          <li>
            Be involved. Talk about class at home and reinforce what was taught with extra
            materials.
          </li>
          <li>
            Talk to the group teachers. We love feedback, whether it is a pat on the back, a
            suggestion or a question about the subject matter.
          </li>
        </Ul>
        <Callout title="A better question than “How was class?”">
          <P>Ask something specific, such as “Name two things that were taught today.”</P>
        </Callout>
        <H3>A few requests</H3>
        <Ul>
          <li>At dismissal, please stand away from the prasad distribution area.</li>
          <li>Make sure children are well rested and have had a good breakfast.</li>
          <li>Please don’t speak with teachers or children during transitions or class time.</li>
          <li>Encourage children not to touch or play with school property.</li>
        </Ul>
      </Section>

      <Section id="health">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="Special needs">
            We strive to accommodate children of varied abilities. Please let the teacher know if
            your child has any special needs.
          </InfoCard>
          <InfoCard title="Prasad">
            We make every effort to distribute nut-free prasad. We still recommend teaching your
            child to check.
          </InfoCard>
          <InfoCard title="Illness">
            If your child is sick, please keep them home. We follow CDC guidance for St. Louis
            County.
          </InfoCard>
        </div>
      </Section>

      <Section id="learn">
        <P>
          Groups K–7 study the religion, culture, history and geography of India, with an
          introduction to the epics Mahabharat and Ramayan and art projects that follow the
          curriculum.
        </P>
        <InfoCard title="Youth Program, Grade 8 and up">
          Gita chanting and discussion, community service projects and guest lectures, with a focus
          on concrete spiritual knowledge and character built on the values of the scriptures.
        </InfoCard>
        <Button asChild variant="outline">
          <Link href="/education/curriculum">See the full curriculum</Link>
        </Button>
      </Section>

      <Section id="yoga-bhajan">
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoCard title="Yoga">
            <P className="text-muted-foreground text-sm">
              “Yoga is the practice of quieting the mind.” Patanjali
            </P>
            <P>
              Our goal is a lifetime interest in health and a stress-free life. Over seven years
              children learn 45 to 50 asanas, three to five kinds of pranayama, meditation
              techniques and an introduction to the Eight Limbs of Ashtanga Yoga.
            </P>
            <Ul>
              <li>Students come with an open mind, their yoga mat and 100% participation.</li>
              <li>Parents support their child’s efforts and encourage practice at home.</li>
            </Ul>
          </InfoCard>
          <InfoCard title="Bhajan">
            <P>
              Thirty minutes of bhajan every class. Children learn the meaning of the five main
              assembly shlokas and prayers and the aarti, and come to appreciate bhajans and shlokas
              in Indian culture.
            </P>
            <Ul>
              <li>
                The bhajan teacher pre-records the next shloka or bhajan and posts it to your
                class’s <Link href="/education/class-webpages">webpage</Link>.
              </li>
              <li>
                Children listen beforehand, learn the meaning in class and sing in small groups for
                feedback.
              </li>
              <li>Parents help their child practice, and can share recordings of them singing.</li>
            </Ul>
          </InfoCard>
        </div>
        <Callout title="Yoga and Bhajan Showcase">
          <P>
            Each May, children show what they have learned during the year. Please support them by
            attending. The date is on the <Link href="/calendar">calendar</Link>.
          </P>
        </Callout>
      </Section>

      <Section id="concerns">
        <P>
          At Bal Vihar, children, teachers, administrative volunteers and parents are equal
          partners, and every effort is made to keep it a safe and happy place. If something is
          wrong, there are two steps.
        </P>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="1. Talk to the teacher">
            Tell the group teachers in person or by email, and work with them to resolve it quickly.
          </InfoCard>
          <InfoCard title="2. Make it formal">
            If it isn’t resolved, send the grievance form to the teacher coordinators. A grievance
            committee then meets with everyone concerned.
          </InfoCard>
        </div>
        <Button asChild variant="outline">
          <Link href="/grievance">File a grievance</Link>
        </Button>
      </Section>

      <Section id="events">
        <P>Learning comes to life at our celebrations.</P>
        <Ul variant="unstyled" className="flex flex-wrap gap-2">
          {EVENTS.map((event) => (
            <li key={event} className="bg-primary-50 rounded-full border px-4 py-1.5 text-sm">
              {event}
            </li>
          ))}
        </Ul>
        <Button asChild variant="outline">
          <Link href="/calendar">View the calendar</Link>
        </Button>
      </Section>

      <Section id="contact">
        <InfoCard title="WhatsApp">
          Every class has its own WhatsApp group. Ask your child’s teacher to add you.
        </InfoCard>
        <P>
          Not sure who to ask? Admin volunteers are in the lobby every class day. You can also
          browse the <Link href="/about-us/administrative-team">administrative team</Link> or read
          the <Link href="/questions">questions and FAQs</Link>.
        </P>
      </Section>

      <Callout title="Become a Bal Vihar volunteer">
        <P>
          Bal Vihar is run entirely by volunteers, and we need you. New teacher volunteers are
          welcome at our training sessions.
        </P>
        <div>
          <Button asChild>
            <Link href="/volunteering">Volunteer with us</Link>
          </Button>
        </div>
        <P className="pt-2">
          Thank you for sharing your children with us. We look forward to a fun-filled year of
          learning together.
        </P>
      </Callout>
    </article>
  );
}

interface CalloutProps {
  title: string;
  children: React.ReactNode;
}

function Callout({ title, children }: CalloutProps) {
  return (
    <div className="bg-primary-50 border-primary-300 space-y-3 rounded-lg border-2 p-5">
      <H3 className="text-xl">{title}</H3>
      {children}
    </div>
  );
}

interface CheckListProps {
  items: readonly string[];
}

function CheckList({ items }: CheckListProps) {
  return (
    <Ul variant="unstyled" className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon aria-hidden="true" className="text-primary-700 mt-0.5 size-5 shrink-0" />
          {item}
        </li>
      ))}
    </Ul>
  );
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <Card className="space-y-2 p-5">
      <H3 className="text-xl">{title}</H3>
      {typeof children === "string" ? <P>{children}</P> : children}
    </Card>
  );
}

interface SectionProps {
  id: keyof typeof SECTIONS;
  children: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-6 space-y-6">
      <H2 id={`${id}-heading`}>{SECTIONS[id]}</H2>
      {children}
    </section>
  );
}
