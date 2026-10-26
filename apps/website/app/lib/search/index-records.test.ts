import { equal, ok } from "node:assert/strict";
import { test } from "node:test";

import { MAX_RECORD_BYTES } from "./algolia-config";
import { createAlgoliaRecord, createAlgoliaRecords } from "./index-records";
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

test("missing boost becomes zero", () => {
  equal(createAlgoliaRecord(base()).boost, 0);
});

test("oversized body text is trimmed until the JSON fits under the byte ceiling", () => {
  const record = createAlgoliaRecord(base({ text: "字".repeat(20_000) }));

  ok(Buffer.byteLength(JSON.stringify(record)) <= MAX_RECORD_BYTES);
  ok(record.text.length < 20_000);
});

test("createAlgoliaRecords maps every document", () => {
  equal(createAlgoliaRecords([base(), base({ id: "b" })]).length, 2);
});
