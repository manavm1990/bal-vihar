import { HEADER_MENUS } from "@bv/schemas/route-config";
import type { MenuNavigationItem } from "@components/header/navs/constants";
import { type StegaBranded, stegaClean } from "@sanity/client/stega";
import type { PAGES_QUERY_RESULT } from "sanity.types";
import { chicagoToday } from "./map-calendar-events";

type CurrentPage = Pick<MenuPage, "endsOn" | "slug">;
type MenuPage = PAGES_QUERY_RESULT[number];

export const getCurrentPages = <T extends CurrentPage>(
  pages: readonly T[] | null | undefined,
  now: Date,
) => (pages ?? []).filter((page) => page.slug && isPageCurrent(page.endsOn, now));

export const getMenuPages = (
  pages: readonly (MenuPage | StegaBranded<MenuPage>)[] | null | undefined,
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
