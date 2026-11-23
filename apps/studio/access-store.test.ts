import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";
import { parsePeople } from "./access-store";

test("teachers keep their classes and other roles ignore any left over", () => {
  const people = parsePeople([
    { id: "teacher", name: "Asha", role: "teacher", classes: ["3-a", null] },
    { id: "editor", name: "Vikram", role: "education", classes: ["3-a"] },
  ]);

  deepStrictEqual(people.get("teacher"), { classes: ["3-a"], name: "Asha", role: "teacher" });
  deepStrictEqual(people.get("editor"), { classes: undefined, name: "Vikram", role: "education" });
});

test("rows without a person or with an unknown role are skipped", () => {
  const people = parsePeople([{ role: "teacher" }, { id: "x", role: "janitor" }, null, "x"]);

  deepStrictEqual([...people.keys()], []);
});

test("a missing list means nobody has a limited view", () => {
  deepStrictEqual(parsePeople(null).size, 0);
});
