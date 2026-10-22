import { getSanityArrayKey } from "./sanity-array-key";
import type { HomeAnnouncement, HomeHeroSlide, HomePageData, SanityImageValue } from "./types";

/** CMS-authored links should resolve to a safe site-relative or absolute URL. */
type SafeHref = `/${string}` | `http://${string}` | `https://${string}` | `mailto:${string}`;

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isSafeHref = (value: unknown): value is SafeHref => {
  if (!isString(value)) return false;

  const href = value.trim();
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

  const relativeHref = href.startsWith("/") ? href : `/${href}`;
  return /^\/(?!\/)[^\s]*$/i.test(relativeHref) && !/^\/(?:javascript:|data:)/i.test(relativeHref);
};

const isString = (value: unknown): value is string => typeof value === "string";

const mapAnnouncement = (value: unknown, index: number): HomeAnnouncement | null => {
  if (!isRecord(value)) return null;

  const title = parseString(value["title"])?.trim();
  const body = parseString(value["body"])?.trim();
  if (!title || !body) return null;

  const toneRaw = parseString(value["tone"]);
  const tone =
    toneRaw === "default" || toneRaw === "urgent" || toneRaw === "success" ? toneRaw : null;

  return {
    key: getSanityArrayKey(value, `announcement-${index}`),
    title,
    body,
    ctaHref: parseSafeHref(value["ctaHref"]),
    ctaLabel: parseString(value["ctaLabel"]),
    endDate: parseString(value["endDate"]),
    isActive: parseBoolean(value["isActive"]),
    startDate: parseString(value["startDate"]),
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

const parseImage = (value: unknown): SanityImageValue | null =>
  isRecord(value) ? (value as SanityImageValue) : null;

const parseSafeHref = (value: unknown): SafeHref | null =>
  isSafeHref(value) ? (value.trim() as SafeHref) : null;

const parseString = (value: unknown): string | null => (isString(value) ? value : null);

/**
 * Normalize a defineLive / client fetch result into our domain HomePageData.
 * Accepts either the bare document or `{ data: document }`.
 */
export const mapHomePage = (input: unknown): HomePageData | null => {
  const root = isRecord(input) ? input : null;
  if (!root) return null;

  const dataRecord = isRecord(root["data"]) ? root["data"] : root;
  const id = parseString(dataRecord["_id"]) ?? parseString(dataRecord["id"]);
  if (!id) return null;

  const announcementsRaw = dataRecord["announcements"];
  const heroRaw = dataRecord["heroSlides"];

  return {
    announcements: Array.isArray(announcementsRaw)
      ? announcementsRaw
          .map(mapAnnouncement)
          .filter((item): item is HomeAnnouncement => item !== null)
      : [],
    heroSlides: Array.isArray(heroRaw)
      ? heroRaw.map(mapHeroSlide).filter((slide): slide is HomeHeroSlide => slide !== null)
      : [],
    id,
    title: parseString(dataRecord["title"]),
    whoWeAre: parseString(dataRecord["whoWeAre"]),
  };
};
