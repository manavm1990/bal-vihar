import { PhotoGrid } from "@components/photos/photo-grid";
import { Card, CardContent } from "@components/ui/card";
import { H2, H3, LeadP, P, Strong } from "@components/ui/typography";
import { fetchSanityData } from "@lib/sanity/fetch";
import {
  isAnnouncementVisible,
  LEGACY_ANNOUNCEMENTS,
  LEGACY_HERO_SLIDES,
  LEGACY_PHOTO_BOARD,
} from "@lib/sanity/home-fallbacks";
import { mapHomePage } from "@lib/sanity/map-home-page";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { HOME_PAGE_QUERY, PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { HomeAnnouncement, HomePageData, HomePhotoBoardItem } from "@lib/sanity/types";
import { cn } from "@lib/utils";
import Link from "next/link";

import { HeroCarousel } from "./hero-carousel.client";

export default async function HomePage() {
  const [homePayload, galleryPayload] = await Promise.all([
    fetchSanityData(HOME_PAGE_QUERY),
    fetchSanityData(PHOTO_GALLERY_QUERY),
  ]);

  const home: HomePageData | null = mapHomePage(homePayload);
  const featuredPhotos: HomePhotoBoardItem[] =
    mapPhotoGallery(galleryPayload, { featuredOnly: true })?.photos ?? [];

  const heroSlides =
    home?.heroSlides && home.heroSlides.length > 0 ? home.heroSlides : LEGACY_HERO_SLIDES;

  const announcementsSource =
    home?.announcements && home.announcements.length > 0
      ? home.announcements
      : LEGACY_ANNOUNCEMENTS;
  const announcements = announcementsSource.filter((item) => isAnnouncementVisible(item));

  const photoBoard = featuredPhotos.length > 0 ? featuredPhotos : LEGACY_PHOTO_BOARD;

  return (
    <div className="flex flex-col gap-4">
      <HeroCarousel slides={heroSlides} />
      <Announcements announcements={announcements} />
      {home?.whoWeAre ? <WhoWeAreBlurb text={home.whoWeAre} /> : null}
      <PhotoGrid
        items={photoBoard}
        title="Community photos"
        description="Featured photos from Bal Vihar events and service projects."
      />
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
  const external = !announcement.ctaHref?.startsWith("/");

  return (
    <Card
      className={cn(
        "border-l-4 bg-muted",
        tone === "urgent" && "border-l-destructive bg-destructive/5",
        tone === "success" && "border-l-emerald-600 bg-emerald-50",
        tone === "default" && "border-l-primary",
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <H2>{announcement.title}</H2>
        <LeadP className="whitespace-pre-line">{announcement.body}</LeadP>
        {announcement.ctaHref && announcement.ctaLabel ? (
          external ? (
            <a href={announcement.ctaHref}>
              <Strong>{announcement.ctaLabel}</Strong>
            </a>
          ) : (
            <Link href={announcement.ctaHref}>
              <Strong>{announcement.ctaLabel}</Strong>
            </Link>
          )
        ) : null}
      </CardContent>
    </Card>
  );
}

interface WhoWeAreBlurbProps {
  text: string;
}

function WhoWeAreBlurb({ text }: WhoWeAreBlurbProps) {
  return (
    <Card className="mx-auto w-full max-w-prose">
      <CardContent className="flex flex-col gap-3 p-4">
        <H3>Who we are</H3>
        <P className="whitespace-pre-line">{text}</P>
      </CardContent>
    </Card>
  );
}
