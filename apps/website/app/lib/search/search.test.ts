import { equal } from "node:assert/strict";
import { test } from "node:test";
import { parseSearchQuery } from "./search";

test("the query param is read from the first value, trimmed and capped", () => {
  equal(parseSearchQuery("  homework "), "homework");
  equal(parseSearchQuery(["first", "second"]), "first");
  equal(parseSearchQuery(undefined), "");
  equal(parseSearchQuery("x".repeat(500)).length, 100);
});
