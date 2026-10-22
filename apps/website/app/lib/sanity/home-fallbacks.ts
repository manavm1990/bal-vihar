import type { HomeAnnouncement, HomeHeroSlide, HomePhotoBoardItem } from "./types";

export const LEGACY_ANNOUNCEMENTS: HomeAnnouncement[] = [
  {
    key: "fallback-registration",
    title: "Bal Vihar 2025-2026 Registration is Now Open! 📢",
    body: "Registration for new and existing students is now open. Classes fill up fast, so don't wait to register! Bal Vihar of St. Louis has been serving the Metro St. Louis Indian community since 1992 and admits students ages 5 through 18 based on regular-school grade level.",
    ctaLabel: "Register now!",
    ctaHref: "https://registration.balviharstlouis.org/",
    isActive: true,
    tone: "default",
  },
];

export const LEGACY_HERO_SLIDES: HomeHeroSlide[] = [
  {
    key: "fallback-republic-day",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2014-republic-day.jpeg" },
      alt: "Bal Vihar students and community members celebrating Republic Day in 2014.",
      caption: "2014 Republic Day",
    },
  },
  {
    key: "fallback-diwali",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg" },
      alt: "Bal Vihar students and families celebrating Diwali in 2015.",
      caption: "2015 Diwali",
    },
  },
  {
    key: "fallback-canstruction",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2016-canstruction.jpg" },
      alt: "Bal Vihar Canstruction project display from 2016.",
      caption: "2016 Canstruction",
    },
  },
  {
    key: "fallback-volunteers",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2Fcanstruction-team.jpg" },
      alt: "Bal Vihar volunteers gathered with a Canstruction community service project.",
      caption: "Canstruction Volunteers",
    },
  },
];

export const LEGACY_PHOTO_BOARD: HomePhotoBoardItem[] = [
  {
    key: "pb-annual",
    title: "Annual Day",
    schoolYear: "TBD",
    note: "Updated photo needed",
  },
  {
    key: "pb-canstruction",
    title: "CANstruction",
    schoolYear: "2016",
    note: "Live hero photo",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2016-canstruction.jpg" },
      alt: "Bal Vihar CANstruction project display from 2016.",
    },
  },
  {
    key: "pb-volunteers",
    title: "CANstruction Volunteers",
    schoolYear: "Recent",
    note: "Live hero photo",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2Fcanstruction-team.jpg" },
      alt: "Bal Vihar volunteers gathered around a CANstruction community service project.",
    },
  },
  {
    key: "pb-diwali",
    title: "Diwali",
    schoolYear: "2015",
    note: "Live hero photo",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg" },
      alt: "Bal Vihar students and families celebrating Diwali in 2015.",
    },
  },
  {
    key: "pb-family",
    title: "Family Night",
    schoolYear: "TBD",
    note: "Updated photo needed",
  },
  {
    key: "pb-first-day",
    title: "First Day of School",
    schoolYear: "TBD",
    note: "Updated photo needed",
  },
  {
    key: "pb-holi",
    title: "Holi Celebration",
    schoolYear: "TBD",
    note: "Updated photo needed",
  },
  {
    key: "pb-republic",
    title: "Republic Day",
    schoolYear: "2014",
    note: "Live hero photo",
    image: {
      asset: { url: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2014-republic-day.jpeg" },
      alt: "Bal Vihar students and community members celebrating Republic Day in 2014.",
    },
  },
];

export function isAnnouncementVisible(
  announcement: HomeAnnouncement,
  now: Date = new Date(),
): boolean {
  if (announcement.isActive === false) return false;

  const nowMs = now.getTime();
  if (announcement.startDate) {
    const start = Date.parse(announcement.startDate);
    if (!Number.isNaN(start) && nowMs < start) return false;
  }
  if (announcement.endDate) {
    const end = Date.parse(announcement.endDate);
    if (!Number.isNaN(end) && nowMs > end) return false;
  }
  return true;
}

export function resolveImageSrc(image: HomeHeroSlide["image"] | HomePhotoBoardItem["image"]) {
  return image?.asset?.url ?? null;
}
