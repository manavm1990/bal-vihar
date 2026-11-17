import { HEADER_MENUS } from "@bv/schemas/route-config";
import type { MenuNavigationItem } from "@components/header/navs/constants";
import { stegaClean } from "@sanity/client/stega";
import type { PAGES_QUERY_RESULT } from "sanity.types";
import { chicagoToday } from "./map-calendar-events";

export const getCurrentPages = (pages: PAGES_QUERY_RESULT | null | undefined, now: Date) =>
  (pages ?? []).filter((page) => page.slug && isPageCurrent(page.endsOn, now));

export const getMenuPages = (
  pages: PAGES_QUERY_RESULT | null | undefined,
  now: Date,
): MenuNavigationItem[] =>
  getCurrentPages(pages, now).flatMap((page) => {
    const menu = HEADER_MENUS.find((name) => name === page.menu);

    return !menu || !page.slug
      ? []
      : [{ menu, name: page.menuLabel?.trim() || page.title || page.slug, link: `/${page.slug}` }];
  });

export const isPageCurrent = (endsOn: string | null | undefined, now: Date) =>
  !endsOn || stegaClean(endsOn) >= chicagoToday(now);
