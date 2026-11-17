import { HEADER_MENUS } from "@bv/schemas/route-config";
import type { MenuNavigationItem } from "@components/header/navs/constants";
import { stegaClean } from "@sanity/client/stega";
import { chicagoToday } from "./map-calendar-events";

interface CurrentPage {
  slug: string | null;
  endsOn: string | null;
}

interface MenuPage extends CurrentPage {
  title: string;
  menu: string | null;
  menuLabel: string | null;
}

export const getCurrentPages = <T extends CurrentPage>(
  pages: readonly T[] | null | undefined,
  now: Date,
) => (pages ?? []).filter((page) => page.slug && isPageCurrent(page.endsOn, now));

export const getMenuPages = (
  pages: readonly MenuPage[] | null | undefined,
  now: Date,
): MenuNavigationItem[] =>
  getCurrentPages(pages, now).flatMap((page) => {
    const menu = HEADER_MENUS.find((name) => name === stegaClean(page.menu ?? ""));

    return !menu || !page.slug
      ? []
      : [{ menu, name: page.menuLabel?.trim() || page.title || page.slug, link: `/${page.slug}` }];
  });

export const isPageCurrent = (endsOn: string | null | undefined, now: Date) =>
  !endsOn || stegaClean(endsOn) >= chicagoToday(now);
