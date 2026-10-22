import { stegaClean } from "@sanity/client/stega";

import { getSanityArrayKey } from "./sanity-array-key";
import type { HomeAnnouncement, HomeHeroSlide, HomePageData, SanityImageValue } from "./types";

/** CMS-authored links should resolve to a safe site-relative or absolute URL. */
type SafeHref = `/${string}` | `http://${string}` | `https://${string}` | `mailto:${string}`;

/**
 * Normalize a defineLive / client fetch result into our domain HomePageData.
 * Accepts either the bare document or `{ data: document }`.
 */
export const mapHomePage = (input: unknown): HomePageData | null => {
  if (!isRecord(input)) return null;

  const dataRecord = isRecord(input["data"]) ? input["data"] : input;
  const id = parseString(dataRecord["_id"]) ?? parseString(dataRecord["id"]);
  if (!id) return null;

  const announcementsRaw = dataRecord["announcements"];
  const heroRaw = dataRecord["heroSlides"];

  return {
    announcements: !Array.isArray(announcementsRaw)
      ? []
      : announcementsRaw
          .map(mapAnnouncement)
          .filter((item): item is HomeAnnouncement => item !== null),
    heroSlides: !Array.isArray(heroRaw)
      ? []
      : heroRaw.map(mapHeroSlide).filter((slide): slide is HomeHeroSlide => slide !== null),
    id,
    title: parseString(dataRecord["title"]),
    whoWeAre: parseString(dataRecord["whoWeAre"]),
  };
};

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Type-guard the already stega-cleaned, trimmed href string. */
const isSafeHref = (href: string): href is SafeHref => {
  if (!href || /\s/.test(href) || href.startsWith("//")) return false;
  if (href.startsWith("mailto:")) return /^mailto:[^\s]+$/i.test(href);

  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      const url = new URL(href);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  return !href.startsWith("/")
    ? false
    : /^\/(?!\/)[^\s]*$/i.test(href) && !/^\/(?:javascript:|data:)/i.test(href);
};

const isString = (value: unknown): value is string => typeof value === "string";

const mapAnnouncement = (value: unknown, index: number): HomeAnnouncement | null => {
  if (!isRecord(value)) return null;

  const title = parseString(value["title"])?.trim();
  const body = parseString(value["body"])?.trim();
  if (!title || !body) return null;

  const toneRaw = parseString(value["tone"]);
  // Clean stega before enum compares used for CSS classes.
  const toneClean = toneRaw ? stegaClean(toneRaw) : null;
  const tone =
    toneClean === "default" || toneClean === "urgent" || toneClean === "success" ? toneClean : null;

  return {
    body,
    ctaHref: parseSafeHref(value["ctaHref"]),
    ctaLabel: parseString(value["ctaLabel"]),
    endDate: parseCleanString(value["endDate"]),
    isActive: parseBoolean(value["isActive"]),
    key: getSanityArrayKey(value, `announcement-${index}`),
    startDate: parseCleanString(value["startDate"]),
    title,
    tone,
  };
};

const mapHeroSlide = (value: unknown, index: number): HomeHeroSlide | null =>
  !isRecord(value)
    ? null
    : {
        image: parseImage(value["image"]),
        key: getSanityArrayKey(value, `hero-${index}`),
        link: parseSafeHref(value["link"]),
      };

const parseBoolean = (value: unknown): boolean | null => (isBoolean(value) ? value : null);

const parseCleanString = (value: unknown): string | null => {
  const raw = parseString(value);
  return !raw ? null : stegaClean(raw);
};

const parseImage = (value: unknown): SanityImageValue | null =>
  // Shape-checked as a record; image fields are validated downstream by renderers.
  isRecord(value) ? (value as SanityImageValue) : null;

const parseSafeHref = (value: unknown): SafeHref | null => {
  if (!isString(value)) return null;

  // Stega encodes edit metadata into strings during draft preview — strip before URL checks.
  const cleaned = stegaClean(value).trim();
  if (!cleaned) return null;

  const href =
    cleaned.startsWith("/") ||
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://") ||
    cleaned.startsWith("mailto:")
      ? cleaned
      : `/${cleaned}`;

  return isSafeHref(href) ? href : null;
};

const parseString = (value: unknown): string | null => (isString(value) ? value : null);
