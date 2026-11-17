import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { getAccess, type Person, SECTION_IDS } from "./roles";

const PEOPLE: Record<string, Person> = {
  calendarPerson: { role: "calendar" },
  teacher: { role: "teacher", classes: ["grade-3"] },
};

test("anyone not on the list sees every section", () => {
  const { canSee, classes } = getAccess("someoneElse", PEOPLE);

  equal(SECTION_IDS.every(canSee), true);
  equal(classes, null);
});

test("a teacher sees only classes, limited to their own", () => {
  const { canSee, classes, types } = getAccess("teacher", PEOPLE);

  deepStrictEqual(SECTION_IDS.filter(canSee), ["classes"]);
  deepStrictEqual(classes, ["grade-3"]);
  deepStrictEqual(types, ["classPage"]);
});

test("a role's types cover every section it can see, without repeats", () => {
  const { types } = getAccess("calendarPerson", PEOPLE);

  deepStrictEqual(types, ["calendarEvent", "spreadsheetImport", "homePage"]);
});

test("signed-out or unknown users fall back to everything", () => {
  equal(getAccess(undefined, PEOPLE).canSee("policies"), true);
});
