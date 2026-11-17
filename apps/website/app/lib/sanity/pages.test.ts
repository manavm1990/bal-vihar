import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import type { PAGES_QUERY_RESULT } from "sanity.types";
import { getCurrentPages, getMenuPages, isPageCurrent } from "./pages";

type PageRow = PAGES_QUERY_RESULT[number];

const createPage = (overrides: Partial<PageRow> = {}): PageRow => ({
  _id: "page-1",
  title: "Diwali Show",
  slug: "diwali-2026",
  description: "Our annual show.",
  menu: null,
  menuLabel: null,
  endsOn: null,
  body: [],
  ...overrides,
});

test("a page with no end date is always current", () => {
  equal(isPageCurrent(null, new Date("2030-01-01T12:00:00Z")), true);
  equal(isPageCurrent(undefined, new Date("2030-01-01T12:00:00Z")), true);
});

test("a page stays current through its last day in Chicago and archives the next day", () => {
  const lateOnLastDay = new Date("2026-11-18T05:30:00Z");
  const earlyNextDay = new Date("2026-11-18T07:00:00Z");

  equal(isPageCurrent("2026-11-17", lateOnLastDay), true);
  equal(isPageCurrent("2026-11-17", earlyNextDay), false);
});

test("the event date, resolved into endsOn, archives a page without its own end date", () => {
  const now = new Date("2026-12-01T18:00:00Z");

  deepStrictEqual(
    getCurrentPages([createPage({ endsOn: "2026-11-20" }), createPage({ _id: "page-2" })], now).map(
      ({ _id }) => _id,
    ),
    ["page-2"],
  );
});

test("only current pages with a real menu reach the header, labelled by menuLabel or title", () => {
  const now = new Date("2026-11-17T18:00:00Z");
  const pages = [
    createPage({ menu: "About", menuLabel: "Diwali" }),
    createPage({ _id: "page-2", slug: "camp", title: "Camp", menu: "Programs" }),
    createPage({ _id: "page-3", menu: "none" }),
    createPage({ _id: "page-4", menu: "About", endsOn: "2026-11-01" }),
  ];

  deepStrictEqual(getMenuPages(pages, now), [
    { menu: "About", name: "Diwali", link: "/diwali-2026" },
    { menu: "Programs", name: "Camp", link: "/camp" },
  ]);
});
