import { equal } from "node:assert/strict";
import { test } from "node:test";
import {
  describeMissingSlash,
  describeRepeatedDates,
  describeUnevenRows,
  getFirstSegment,
  hasSlug,
  isAdministrator,
  parseSitePath,
} from "./field-rules";
import { getSchoolYear } from "./school-years";

const TABLE = { headers: ["Fee", "Amount", "Due"] };

test("a table whose rows all match the headings passes", () => {
  equal(describeUnevenRows([{ cells: ["a", "b", "c"] }, { cells: ["d", "e", "f"] }], TABLE), null);
});

test("rows with too few or too many cells are listed by number", () => {
  equal(
    describeUnevenRows([{ cells: ["a", "b", "c"] }, { cells: ["d"] }, { cells: [] }], TABLE),
    "The table has 3 columns, but row 2 has 1, row 3 has 0. Give every row one cell per column.",
  );
});

test("a table without headings or rows is left to the required checks", () => {
  equal(describeUnevenRows([{ cells: ["a"] }], { headers: [] }), null);
  equal(describeUnevenRows(undefined, TABLE), null);
});

test("a slug counts only once it has a value", () => {
  equal(hasSlug({ current: "diwali-2026" }), true);
  equal(hasSlug({ current: "" }), false);
  equal(hasSlug(undefined), false);
});

test("only the administrator role unlocks admin fields", () => {
  equal(isAdministrator({ roles: [{ name: "administrator" }] }), true);
  equal(isAdministrator({ roles: [{ name: "editor" }] }), false);
  equal(isAdministrator(null), false);
});

test("site links need a leading slash; full addresses and empty values pass", () => {
  equal(describeMissingSlash("/calendar"), null);
  equal(describeMissingSlash("#fees"), null);
  equal(describeMissingSlash("https://example.org"), null);
  equal(describeMissingSlash("mailto:info@example.org"), null);
  equal(describeMissingSlash(""), null);
  equal(typeof describeMissingSlash("calendar"), "string");
  equal(typeof describeMissingSlash("www.example.org"), "string");
});

test("repeated session dates are listed once each", () => {
  equal(describeRepeatedDates([{ date: "2026-09-13" }, { date: "2026-09-20" }]), null);
  equal(
    describeRepeatedDates([
      { date: "2026-09-13" },
      { date: "2026-09-13" },
      { date: "2026-09-13" },
      { date: "2026-09-20" },
    ]),
    "More than one update is dated 2026-09-13. Add to the existing update or fix the date.",
  );
  equal(describeRepeatedDates(undefined), null);
});

test("own-site addresses become paths and other sites are left alone", () => {
  equal(parseSitePath("/calendar"), "/calendar");
  equal(parseSitePath("https://balvihar-stlouis.com/donate?x=1#top"), "/donate?x=1#top");
  equal(parseSitePath("https://www.balvihar-stlouis.com/"), "/");
  equal(parseSitePath("https://example.org/calendar"), null);
  equal(parseSitePath("calendar"), null);
});

test("the first path segment ignores queries and anchors", () => {
  equal(getFirstSegment("/about-us/history"), "about-us");
  equal(getFirstSegment("/calendar?month=9"), "calendar");
  equal(getFirstSegment("/#top"), "");
  equal(getFirstSegment("/"), "");
});

test("school years turn over in August", () => {
  equal(getSchoolYear("2026-07-31"), "2025-26");
  equal(getSchoolYear("2026-08-01"), "2026-27");
  equal(getSchoolYear("2099-12-01"), "2099-00");
});
