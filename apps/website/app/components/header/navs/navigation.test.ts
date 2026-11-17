import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { mergeNavigation, NAVIGATION } from "./constants";

const getItems = (name: string) => mergeNavigation(EXTRA).find((item) => item.name === name)?.items;

const EXTRA = [
  { menu: "About", name: "Diwali 2026", link: "/diwali-2026" },
  { menu: "Programs", name: "Summer camp", link: "/summer-camp" },
] as const;

test("without editor pages the navigation is unchanged", () => {
  deepStrictEqual(mergeNavigation([]), NAVIGATION);
});

test("a page is appended to its menu and the other menus are untouched", () => {
  const about = NAVIGATION.find((item) => item.name === "About")?.items ?? [];

  deepStrictEqual(getItems("About")?.slice(0, about.length), about);
  deepStrictEqual(getItems("Contact"), NAVIGATION.find((item) => item.name === "Contact")?.items);
});

test("menus with groups file the page under More, menus without groups stay flat", () => {
  deepStrictEqual(getItems("About")?.at(-1), {
    name: "Diwali 2026",
    link: "/diwali-2026",
    group: "More",
  });
  equal(getItems("Programs")?.at(-1)?.group, undefined);
});
