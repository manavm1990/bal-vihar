import EventCard from "@components/event-card.client";
import { SanityImage } from "@components/sanity-image";
import { TypicalSunday, typicalSundaySteps } from "@components/typical-sunday";
import { Button } from "@components/ui/button";
import { Bq, H1, H2, LeadP, MutedP, P } from "@components/ui/typography";
import { getCachedNow } from "@lib/clock";
import { REGISTRATION_URL } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { getUpcomingCalendarEvents, mapCalendarEvents } from "@lib/sanity/map-calendar-events";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { CALENDAR_EVENTS_QUERY, PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { CalendarEventData, HomePhotoBoardItem } from "@lib/sanity/types";
import Link from "next/link";

const MISSION =
  "To throw the light of cultural knowledge on every child, to make every child an outstanding citizen and to spread the song of peace and harmony around the world.";
const QUICK_LINKS = [
  {
    title: "Class schedule & rooms",
    href: "/education/class-schedule",
    text: "Sunday times and which room each class is in.",
  },
  {
    title: "Class webpages",
    href: "/education/class-webpages",
    text: "What your child's class covered, plus homework and links.",
  },
  {
    title: "Calendar",
    href: "/calendar",
    text: "Class Sundays, celebrations and special events.",
  },
  {
    title: "Policies & procedures",
    href: "/about-us/policies-procedures",
    text: "How the school runs, step by step.",
  },
  {
    title: "Contact & FAQs",
    href: "/questions",
    text: "Quick answers, or send us a question.",
  },
] as const;
const STATS = [
  { value: "1992", label: "Serving Metro St. Louis since" },
  { value: "350+", label: "Students" },
  { value: "70+", label: "Volunteer teachers and assistants" },
  { value: "501(c)(3)", label: "All-volunteer non-profit" },
] as const;
const WHO_WE_ARE =
  "Center for Indian Cultural Education – Bal Vihar of St. Louis is a non-profit organization that has served the Metro St. Louis Indian community since 1992. Our primary focus is Indian cultural education for students ages 5–18, and its application and integration with the global, multicultural society. Students also learn discipline, tolerance and devotion in their daily routine.";
const AUDIENCE_LINKS = [
  {
    title: "New family",
    href: "/new-families",
    description: "Start here for schedules, the first Sunday, and what to bring.",
  },
  {
    title: "Current parent",
    href: "/parents",
    description: "View updates, schedules, and parent resources for the current session.",
  },
  {
    title: "Student",
    href: "/education/class-webpages",
    description: "Check classwork, lessons, and what your class covered.",
  },
  {
    title: "Teacher",
    href: "/education/curriculum",
    description: "See the curriculum, class scope, and teaching materials.",
  },
  {
    title: "Volunteer",
    href: "/volunteering",
    description: "Explore the ways families can help support Bal Vihar.",
  },
] as const;
const PILLARS = [
  {
    title: "History & geography",
    body: "Students learn where India is, how its people and landscapes shaped the nation, and the stories that carry its identity forward.",
  },
  {
    title: "Culture & festivals",
    body: "From traditions and art to holidays and music, children discover the richness of Indian culture in everyday life and celebration.",
  },
  {
    title: "Values & stories",
    body: "The epics, sages, and moral teachings of India give students a framework for empathy, character, and thoughtful living.",
  },
  {
    title: "Yoga & meditation",
    body: "Mindful movement, breath, and focus help children build discipline, calm, and confidence.",
  },
  {
    title: "Bhajans",
    body: "Students practice devotional songs and rhythm, connecting joy, memory, and community through music.",
  },
  {
    title: "Community service",
    body: "Service projects and outreach teach children to care for others, serve the wider community, and live out shared values.",
  },
] as const;
export default async function HomePage() {
  const [calendarPayload, galleryPayload, now] = await Promise.all([
    fetchSanityData(CALENDAR_EVENTS_QUERY),
    fetchSanityData(PHOTO_GALLERY_QUERY),
    getCachedNow(),
  ]);

  const events = getUpcomingCalendarEvents(mapCalendarEvents(calendarPayload), { now });

  const photos = (mapPhotoGallery(galleryPayload, { featuredOnly: true })?.photos ?? [])
    .filter((photo) => photo.image?.asset?._id || photo.image?.asset?.url)
    .slice(0, 8);
  const banner = photos[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Intro text={WHO_WE_ARE} />
        <QuickLinks />
        <PhotoBanner photo={banner} />
        <aside className="lg:col-start-2 lg:row-span-5 lg:row-start-1">
          <UpcomingEvents events={events} />
        </aside>
        <Stats />
        <TypicalSunday steps={typicalSundaySteps} />
        <LearningPillars />
        <NewToBalVihar />
        <PhotoStrip photos={photos} />
      </div>
    </div>
  );
}

interface IntroProps {
  text: string;
}

function Intro({ text }: IntroProps) {
  return (
    <section className="space-y-5 lg:col-start-1">
      <p className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
        Sunday School • Ages 5–18 • Since 1992
      </p>
      <H1 className="text-4xl sm:text-5xl">Roots to grow on.</H1>
      <LeadP className="max-w-prose text-base whitespace-pre-line sm:text-xl">{text}</LeadP>
      <P>
        Bal Vihar classes meet on select Sundays, usually every other week, from August through May
        at the Hindu Temple Community Center, 2nd floor. See the{" "}
        <Link href="/calendar">calendar</Link> for dates.
      </P>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href={REGISTRATION_URL}>Enroll</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/new-families">New families</Link>
        </Button>
      </div>
      <div className="space-y-2">
        <p
          id="audience-links-title"
          className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm"
        >
          I am a...
        </p>
        <ul
          aria-labelledby="audience-links-title"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AUDIENCE_LINKS.map((audience) => (
            <li key={audience.title} className="list-none">
              <Link
                href={audience.href}
                className="bg-background hover:bg-primary-50 focus-visible:ring-ring flex h-full min-h-28 flex-col rounded-lg border p-4 shadow-sm transition-colors hover:no-underline focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-secondary text-base font-semibold">{audience.title}</span>
                <span className="mt-2 text-sm text-slate-700">{audience.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Bq>{MISSION}</Bq>
    </section>
  );
}

interface PhotoBannerProps {
  photo: HomePhotoBoardItem | undefined;
}

function PhotoBanner({ photo }: PhotoBannerProps) {
  return !photo?.image ? null : (
    <figure className="relative aspect-16/7 overflow-hidden rounded-lg border lg:col-start-1">
      <SanityImage
        value={photo.image}
        fallbackAlt={photo.title}
        fill
        width={1200}
        height={525}
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover"
        priority
      />
    </figure>
  );
}

interface PhotoStripProps {
  photos: HomePhotoBoardItem[];
}

function PhotoStrip({ photos }: PhotoStripProps) {
  return photos.length === 0 ? null : (
    <section className="space-y-4 lg:col-start-1">
      <H2 variant="plain">Around Bal Vihar</H2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((photo) => (
          <li key={photo.key}>
            <Link
              href="/photos"
              className="group relative block aspect-4/3 overflow-hidden rounded-lg border"
              aria-label={photo.title ? `View photos: ${photo.title}` : "View photos"}
            >
              {photo.image ? (
                <SanityImage
                  value={photo.image}
                  fallbackAlt={photo.title}
                  fill
                  width={480}
                  height={360}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-opacity group-hover:opacity-90"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/photos" className="inline-block font-semibold">
        More photos
      </Link>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="space-y-4 lg:col-start-1">
      <H2 variant="plain">Find it fast</H2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {QUICK_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="bg-background hover:bg-primary-50 focus-visible:ring-ring block h-full min-h-14 rounded-lg border p-4 shadow-sm hover:no-underline focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="text-secondary block text-lg font-semibold">{link.title}</span>
              <MutedP className="text-sm">{link.text}</MutedP>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stats() {
  return (
    <dl className="bg-navy grid grid-cols-2 gap-4 rounded-lg p-6 md:grid-cols-4 lg:col-start-1">
      {STATS.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <dt className="font-display text-primary text-3xl font-bold">{stat.value}</dt>
          <dd className="text-sm text-white">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function LearningPillars() {
  return (
    <section className="space-y-4 lg:col-start-1">
      <H2 variant="plain">What children learn</H2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="text-secondary text-lg font-semibold">{pillar.title}</h3>
            <P className="mt-2 text-sm leading-6">{pillar.body}</P>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewToBalVihar() {
  return (
    <section className="bg-navy rounded-lg p-6 text-white lg:col-start-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <H2 variant="plain" className="text-white">
            New to Bal Vihar?
          </H2>
          <P className="text-sm text-white/80">
            Learn how families get started, what a Sunday looks like, and how to join the next
            session.
          </P>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={REGISTRATION_URL}>Enroll</a>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface UpcomingEventsProps {
  events: CalendarEventData[];
}

function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="bg-primary-50 space-y-4 rounded-lg border p-4 lg:sticky lg:top-4">
      <H2 variant="plain" className="text-2xl">
        Upcoming events
      </H2>
      {events.length === 0 ? (
        <MutedP>No upcoming events are scheduled right now.</MutedP>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
      <Link href="/calendar" className="inline-block font-semibold">
        Full calendar
      </Link>
    </section>
  );
}
