import { stegaClean } from "@sanity/client/stega";
import type { HomePageData } from "./types";

type SafeHref = `/${string}` | `http://${string}` | `https://${string}` | `mailto:${string}`;

export const mapHomePage = (input: unknown): HomePageData | null => {
  if (!isRecord(input)) return null;

  const dataRecord = isRecord(input["data"]) ? input["data"] : input;
  const id = parseString(dataRecord["_id"]) ?? parseString(dataRecord["id"]);
  if (!id) return null;

  const noticeText = parseString(dataRecord["noticeText"])?.trim();
  const noticeHref = parseSafeHref(dataRecord["noticeHref"]);
  const noticeLabel = noticeHref ? (parseString(dataRecord["noticeLabel"])?.trim() ?? null) : null;

  return {
    id,
    noticeHref,
    noticeLabel,
    noticeText: noticeText ?? null,
    title: parseString(dataRecord["title"]),
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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

const parseSafeHref = (value: unknown): SafeHref | null => {
  if (!isString(value)) return null;

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
