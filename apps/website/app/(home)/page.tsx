import EventCard from "@components/event-card";
import { SanityImage } from "@components/sanity/sanity-image";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Bq, H1, H2, H3, LeadP, MutedP, P } from "@components/ui/typography";
import { isAnnouncementVisible } from "@lib/sanity/announcements";
import { fetchSanityData } from "@lib/sanity/fetch";
import { getUpcomingCalendarEvents, mapCalendarEvents } from "@lib/sanity/map-calendar-events";
import { mapHomePage } from "@lib/sanity/map-home-page";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { CALENDAR_EVENTS_QUERY, HOME_PAGE_QUERY, PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type {
  CalendarEventData,
  HomeAnnouncement,
  HomePageData,
  HomePhotoBoardItem,
} from "@lib/sanity/types";
import { cn } from "@lib/utils";
import Link from "next/link";

import { HeroCarousel } from "./hero-carousel.client";

const MISSION =
  "To throw the light of cultural knowledge on every child, to make every child an outstanding citizen and to spread the song of peace and harmony around the world.";

const PROGRAMS = [
  {
    title: "Curriculum K–7",
    href: "/education/curriculum-k-7",
    text: "A well-designed curriculum for younger children, with students grouped in classrooms by age.",
  },
  {
    title: "Youth Group",
    href: "/education/curriculum-youth-group",
    text: "Value-based teaching for older students: respect, honesty and good citizenship.",
  },
  {
    title: "Community Outreach",
    href: "/about-us/community-outreach",
    text: "Interfaith and community service activities that are part of the curriculum.",
  },
] as const;

const REGISTRATION_URL = "https://registration.balviharstlouis.org/";

const STATS = [
  { value: "1992", label: "Serving Metro St. Louis since" },
  { value: "350+", label: "Students" },
  { value: "70+", label: "Volunteer teachers and assistants" },
  { value: "501(c)(3)", label: "All-volunteer non-profit" },
] as const;

const WHO_WE_ARE =
  "Center for Indian Cultural Education – Bal Vihar of St. Louis is a non-profit organization that has served the Metro St. Louis Indian community since 1992. Our primary focus is Indian cultural education for students ages 5–18, and its application and integration with the global, multicultural society. Students also learn discipline, tolerance and devotion in their daily routine.";

export default async function HomePage() {
  const [homePayload, calendarPayload, galleryPayload] = await Promise.all([
    fetchSanityData(HOME_PAGE_QUERY),
    fetchSanityData(CALENDAR_EVENTS_QUERY),
    fetchSanityData(PHOTO_GALLERY_QUERY),
  ]);

  const home: HomePageData | null = mapHomePage(homePayload);
  const heroSlides = home?.heroSlides ?? [];
  const announcements = (home?.announcements ?? []).filter((item) => isAnnouncementVisible(item));
  const events = getUpcomingCalendarEvents(mapCalendarEvents(calendarPayload));
  const photos = (mapPhotoGallery(galleryPayload, { featuredOnly: true })?.photos ?? [])
    .filter((photo) => photo.image?.asset?._id || photo.image?.asset?.url)
    .slice(0, 8);
  const banner = photos[0];

  return (
    <div className="flex flex-col gap-8">
      <Announcements announcements={announcements} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Intro text={home?.whoWeAre ?? WHO_WE_ARE} />
        <PhotoBanner photo={banner} />
        <aside className="lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <UpcomingEvents events={events} />
        </aside>
        <Stats />
        <Programs />
        <PhotoStrip photos={photos} />
      </div>

      <HeroCarousel slides={heroSlides} />
    </div>
  );
}

interface AnnouncementsProps {
  announcements: HomeAnnouncement[];
}

function Announcements({ announcements }: AnnouncementsProps) {
  return announcements.length === 0 ? null : (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-4">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.key} announcement={announcement} />
      ))}
    </div>
  );
}

interface AnnouncementCardProps {
  announcement: HomeAnnouncement;
}

function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const tone = announcement.tone ?? "default";
  const CtaLink = announcement.ctaHref?.startsWith("/") ? Link : "a";

  return (
    <Card
      className={cn(
        "border-2 shadow-none",
        tone === "urgent" && "border-destructive/40 bg-destructive/5",
        tone === "success" && "border-success/40 bg-success/5",
        tone === "default" && "border-primary-300 bg-primary-50",
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <H2>{announcement.title}</H2>
        <LeadP className="whitespace-pre-line">{announcement.body}</LeadP>
        {announcement.ctaHref && announcement.ctaLabel ? (
          <Button asChild className="w-fit">
            <CtaLink href={announcement.ctaHref}>{announcement.ctaLabel}</CtaLink>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface IntroProps {
  text: string;
}

function Intro({ text }: IntroProps) {
  return (
    <section className="space-y-4 lg:col-start-1">
      <MutedP className="font-semibold tracking-wide uppercase">
        Center for Indian Cultural Education
      </MutedP>
      <H1>Bal Vihar of St. Louis</H1>
      <LeadP className="max-w-prose text-base whitespace-pre-line sm:text-xl">{text}</LeadP>
      <P>
        Classes meet every other Sunday from August through May at the Hindu Temple Community
        Center, 2nd floor.
      </P>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href={REGISTRATION_URL}>Register a student</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/about-us/history">Our story</Link>
        </Button>
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
          <li key={photo.key} className="relative aspect-4/3 overflow-hidden rounded-lg border">
            {photo.image ? (
              <SanityImage
                value={photo.image}
                fallbackAlt={photo.title}
                fill
                width={480}
                height={360}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            ) : null}
          </li>
        ))}
      </ul>
      <Link href="/photos" className="inline-block font-semibold">
        More photos
      </Link>
    </section>
  );
}

function Programs() {
  return (
    <section className="space-y-4 lg:col-start-1">
      <H2 variant="plain">What we teach</H2>
      <ul className="grid gap-4 md:grid-cols-3">
        {PROGRAMS.map((program) => (
          <li key={program.href}>
            <Card className="h-full">
              <CardContent className="space-y-2 p-4">
                <H3 className="text-xl">
                  <Link href={program.href} className="text-secondary hover:underline">
                    {program.title}
                  </Link>
                </H3>
                <MutedP>{program.text}</MutedP>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stats() {
  return (
    <dl className="bg-secondary text-secondary-foreground grid grid-cols-2 gap-4 rounded-lg p-6 md:grid-cols-4 lg:col-start-1">
      {STATS.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <dt className="font-eczar text-3xl font-bold">{stat.value}</dt>
          <dd className="text-sm">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

interface UpcomingEventsProps {
  events: CalendarEventData[];
}

function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="bg-gray-50 space-y-4 rounded-lg border p-4 lg:sticky lg:top-4">
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
