import { type StegaBranded, stegaClean } from "@sanity/client/stega";
import type { HOME_PAGE_QUERY_RESULT } from "sanity.types";

export type HomeNotice = NonNullable<ReturnType<typeof mapHomePage>>;
type SafeHref = `/${string}` | `http://${string}` | `https://${string}` | `mailto:${string}`;

export function mapHomePage(home: StegaBranded<HOME_PAGE_QUERY_RESULT> | undefined) {
  if (!home) return null;

  const noticeHref = parseSafeHref(home.noticeHref);

  return {
    noticeHref,
    noticeLabel: noticeHref ? (home.noticeLabel?.trim() ?? null) : null,
    noticeText: home.noticeText?.trim() ?? null,
    noticeUntil: home.noticeUntil ? stegaClean(home.noticeUntil) : null,
  } as const;
}

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

function parseSafeHref(value: string | null) {
  const cleaned = value ? stegaClean(value).trim() : "";
  if (!cleaned) return null;

  const href =
    cleaned.startsWith("/") ||
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://") ||
    cleaned.startsWith("mailto:")
      ? cleaned
      : `/${cleaned}`;

  return isSafeHref(href) ? href : null;
}
