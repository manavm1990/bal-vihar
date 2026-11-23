import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { getAccess, type Person, SECTION_IDS } from "./roles";

const PEOPLE = new Map<string, Person>([
  ["photosPerson", { role: "photos" }],
  ["teacher", { role: "teacher", classes: ["grade-3"] }],
]);

const ADMIN = { id: "admin", roles: [{ name: "administrator" }] };

const createUser = (id: string) => ({ id, roles: [{ name: "editor" }] });

test("anyone not on the list sees every section", () => {
  const { canSee, classes } = getAccess(createUser("someoneElse"), {
    people: PEOPLE,
    viewAs: null,
  });

  equal(SECTION_IDS.every(canSee), true);
  equal(classes, null);
});

test("a teacher sees only classes, limited to their own", () => {
  const { canSee, classes, types } = getAccess(createUser("teacher"), {
    people: PEOPLE,
    viewAs: null,
  });

  deepStrictEqual(SECTION_IDS.filter(canSee), ["classes"]);
  deepStrictEqual(classes, ["grade-3"]);
  deepStrictEqual(types, ["classPage"]);
});

test("a role's types cover every section it can see, without repeats", () => {
  const { types } = getAccess(createUser("photosPerson"), { people: PEOPLE, viewAs: null });

  deepStrictEqual(types, ["photoGallery", "photoAlbum"]);
});

test("signed-out or unknown users fall back to everything", () => {
  equal(getAccess(undefined, { people: PEOPLE, viewAs: null }).canSee("policies"), true);
});

test("an administrator viewing as a teacher of two classes sees just those classes", () => {
  const { canSee, classes } = getAccess(ADMIN, { people: PEOPLE, viewAs: "teacherOfTwo" });

  deepStrictEqual(SECTION_IDS.filter(canSee), ["classes"]);
  deepStrictEqual(classes, ["3-a", "bhajan"]);
});

test("an education lead sees every class plus the faculty and team lists", () => {
  const { canSee, classes } = getAccess(ADMIN, { people: PEOPLE, viewAs: "education" });

  deepStrictEqual(SECTION_IDS.filter(canSee), ["adminTeam", "classes", "faculty"]);
  equal(classes, null);
});

test("the Impact Award belongs to the B-VISION coordinator, not the volunteer coordinator", () => {
  deepStrictEqual(getAccess(ADMIN, { people: PEOPLE, viewAs: "bVision" }).types, ["impactAward"]);
  deepStrictEqual(getAccess(ADMIN, { people: PEOPLE, viewAs: "volunteers" }).types, [
    "volunteerRoster",
    "spreadsheetImport",
  ]);
});

test("the president sees only the President's Message", () => {
  const { canSee } = getAccess(ADMIN, { people: PEOPLE, viewAs: "president" });

  deepStrictEqual(SECTION_IDS.filter(canSee), ["presidentsMessage"]);
});

test("a chosen view is ignored for non-administrators and for unknown names", () => {
  deepStrictEqual(getAccess(createUser("teacher"), { people: PEOPLE, viewAs: "photos" }).classes, [
    "grade-3",
  ]);
  equal(SECTION_IDS.every(getAccess(ADMIN, { people: PEOPLE, viewAs: "nobody" }).canSee), true);
});
