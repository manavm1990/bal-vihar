import { equal } from "node:assert/strict";
import { test } from "node:test";
import { describeUnevenRows, hasSlug, isAdministrator } from "./field-rules";

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
