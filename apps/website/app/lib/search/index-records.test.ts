import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { createAlgoliaRecord } from "./index-records";
import type { SearchDocument } from "./search";

const base = (overrides: Partial<SearchDocument> = {}): SearchDocument => ({
  id: "page:/about-us",
  title: "About Us",
  section: "About Us",
  href: "/about-us",
  text: "Short body",
  ...overrides,
});

test("a normal document keeps its text and gets a numeric boost", () => {
  const record = createAlgoliaRecord(base({ boost: 5 }));

  equal(record.objectID, "page:/about-us");
  equal(record.text, "Short body");
  equal(record.boost, 5);
});

test("oversized body text is trimmed until the JSON fits under the byte ceiling", () => {
  const record = createAlgoliaRecord(base({ text: "字".repeat(20_000) }));

  ok(Buffer.byteLength(JSON.stringify(record)) <= 9000);
  ok(record.text.length < 20_000);
});
