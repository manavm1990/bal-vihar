import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { H1, H2, H3, LeadP, Ol, P, Ul } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "New Families";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Everything new Bal Vihar families need: what a Sunday looks like, drop-off and pick-up, what to bring, and who to ask.",
};

const SECTIONS = {
  sunday: "Your Sunday",
  arrival: "Arrival and pick-up",
  bring: "What to bring",
  support: "Supporting your child",
  health: "Health and special needs",
  learn: "What children learn",
  "yoga-bhajan": "Yoga and Bhajan",
  concerns: "If you have a concern",
  events: "Events",
  contact: "Staying in touch",
} as const;

const STATS = [
  { value: "Every other Sunday", label: "August to May. Dates are on the calendar." },
  { value: "10:00 a.m.", label: "Assembly begins. Doors open at 9:45." },
  { value: "Groups K–7", label: "Plus a Youth Program from Grade 8." },
] as const;

const DAY_STEPS = [
  {
    time: "9:45 a.m.",
    title: "Doors open",
    detail: "Drop off at the side entrance of the Hindu Temple Community Center.",
  },
  {
    time: "10:00 a.m.",
    title: "Assembly",
    detail:
      "Groups K–3 start with Aarti in their classrooms. Groups 4–7 gather for assembly in the hall and stage areas.",
  },
  {
    time: "About an hour",
    title: "Classroom instruction",
    detail: "Culture, religion, history and geography, with art projects that follow the lessons.",
  },
  {
    time: "About an hour",
    title: "Yoga and bhajan",
    detail:
      "Half an hour of each. Groups K–3 have class first, then yoga and bhajan. Groups 4–7 do it the other way around.",
  },
  {
    time: "12:20 or 12:30 p.m.",
    title: "Dismissal",
    detail: "Groups K–3 finish at 12:20 p.m. and groups 4–7 at 12:30 p.m.",
  },
] as const;

const BACKPACK_ITEMS = [
  "A labeled bag or backpack",
  "A composition book and a pencil or pen",
  "Colored markers or crayons",
  "Scissors and glue",
  "A labeled yoga mat",
  "The Bal Vihar Bhajan Book. New families buy one.",
] as const;

const YOGA_WEAR_ITEMS = [
  "Loose, comfortable clothes",
  "No jeans, belts, necklaces and the like",
  "Shorts or tights under a skirt or dress",
] as const;

const LEARNING_AREAS = [
  {
    title: "Religion",
    body: "Values and ethics from the Puranas, the Gods and Goddesses and the Dasa Avatars, the two epics, symbolism, samskaras and the meaning of festivals.",
  },
  {
    title: "Culture",
    body: "Why festivals matter, Indian art, architecture, literature, sports and music, and the diversity of cultures across India.",
  },
  {
    title: "History",
    body: "From the Vedic era to modern India: how India has changed over time, and how to research and present what they find.",
  },
  {
    title: "Geography",
    body: "Where India sits and who its neighbors are, its mountains, plains, desert and rivers, and how the seasons shape agriculture.",
  },
] as const;

const EVENTS = [
  "Diwali",
  "Picnic and Family Night",
  "Republic Day",
  "Holi",
  "Variety Show",
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
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <a href="#sunday">See a typical Sunday</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">Who to ask</a>
          </Button>
        </div>
      </header>

      <section
        aria-label="Bal Vihar at a glance"
        className="bg-secondary text-secondary-foreground grid gap-6 rounded-lg p-6 sm:grid-cols-3"
      >
        {STATS.map((stat) => (
          <div key={stat.value}>
            <p className="font-eczar text-3xl leading-10 font-bold">{stat.value}</p>
            <p className="mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </section>

      <nav aria-label="On this page">
        <ul className="flex flex-wrap gap-2">
          {Object.entries(SECTIONS).map(([id, title]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="border-border text-navy-600 hover:bg-accent hover:text-primary-ink inline-block rounded-full border px-4 py-1.5 text-sm font-medium hover:no-underline"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="sunday">
        <P>
          Every class opens with assembly at 10:00 a.m., then moves through an hour of classroom
          instruction and an hour of yoga and bhajan.
        </P>
        <Ol variant="unstyled" className="space-y-3">
          {DAY_STEPS.map((step) => (
            <li key={step.title} className="space-y-1 rounded-lg border p-4">
              <p className="text-primary-ink text-sm font-semibold">{step.time}</p>
              <H3 className="text-xl">{step.title}</H3>
              <P>{step.detail}</P>
            </li>
          ))}
        </Ol>
        <Button asChild variant="outline">
          <Link href="/education/class-schedule">Rooms and times for every group</Link>
        </Button>
      </Section>

      <Section id="arrival">
        <P>Your child’s safety is important to us.</P>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Drop-off">
            Use the side entrance of the Hindu Temple Community Center from 9:45 a.m. Assembly
            starts at 10:00 a.m. in the classrooms.
          </InfoCard>
          <InfoCard title="Running late">
            Late arrivals wait in the common area and join their class after Aarti.
          </InfoCard>
          <InfoCard title="Pick-up">
            All dismissals are at the side entrance, except Groups K and 1: they finish at 12:20
            p.m. and are picked up from the Parents’ lounge. Everyone must be collected on time, no
            exceptions.
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
            <CheckList items={BACKPACK_ITEMS} />
          </InfoCard>
          <InfoCard title="What to wear for yoga">
            <CheckList items={YOGA_WEAR_ITEMS} />
          </InfoCard>
        </div>
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
          <li>Make sure you are in your class’s WhatsApp group.</li>
        </Ul>
        <Callout title="A better question than “How was class?”">
          <P>Ask something specific, such as “Name two things that were taught today.”</P>
        </Callout>
        <H3>A few requests</H3>
        <Ul>
          <li>At dismissal, please stand away from the prasad distribution area.</li>
          <li>Make sure children are well rested and have had a good breakfast.</li>
          <li>
            Please don’t speak with teachers or children during transitions or class time. Admin
            volunteers are always in the lobby to take your questions.
          </li>
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
        <div className="grid gap-4 sm:grid-cols-2">
          {LEARNING_AREAS.map((area) => (
            <InfoCard key={area.title} title={area.title}>
              {area.body}
            </InfoCard>
          ))}
        </div>
        <InfoCard title="Youth Program, Grade 8 and up">
          Gita chanting and discussion, community service projects and guest lectures, with a focus
          on concrete spiritual knowledge and character built on the values of the scriptures.
        </InfoCard>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/education/curriculum-k-7">Curriculum (K–7)</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/education/curriculum-youth-group">Curriculum – Youth Group</Link>
          </Button>
        </div>
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
                The bhajan teacher pre-records the next shloka or bhajan and posts it to the class
                Google site.
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
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="This website">Updates and announcements are posted here first.</InfoCard>
          <InfoCard title="WhatsApp">
            Every class has its own group. Ask your child’s teacher to add you.
          </InfoCard>
          <InfoCard title="Class Google site">
            Bhajan and shloka recordings are posted in your class’s folder.
          </InfoCard>
        </div>
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
