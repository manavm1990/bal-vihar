import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";

import { highlightText, parseSearchQuery, type SearchDocument, searchDocuments } from "./search";

const DOCUMENTS: SearchDocument[] = [
  {
    id: "schedule",
    title: "Class Schedule & Rooms",
    section: "Education",
    href: "/education/class-schedule",
    text: "Sunday class times and which room each group meets in.",
  },
  {
    id: "calendar",
    title: "Calendar",
    section: "Events & Community",
    href: "/calendar",
    text: "Class Sundays, celebrations and special events such as Diwali.",
  },
  {
    id: "faculty",
    title: "Teaching Faculty",
    section: "Education",
    href: "/education/teaching-faculty",
    text: "Who teaches each group, with the teachers and assistants.",
  },
  {
    id: "giving",
    title: "Giving",
    section: "Get Involved",
    href: "/giving",
    text: "Support Bal Vihar with a tax-deductible gift. No fees are charged for donations.",
  },
];

const ids = (query: string) => searchDocuments(DOCUMENTS, query).map(({ document }) => document.id);

test("an empty or symbol-only query finds nothing", () => {
  deepStrictEqual(ids(""), []);
  deepStrictEqual(ids("   "), []);
  deepStrictEqual(ids("?!"), []);
});

test("matching ignores case and finds words in the body", () => {
  deepStrictEqual(ids("DIWALI"), ["calendar"]);
});

test("every word must appear, in any field", () => {
  deepStrictEqual(ids("diwali celebrations"), ["calendar"]);
  deepStrictEqual(ids("diwali teachers"), []);
});

test("a word matches from the start of a word, and plurals match singulars", () => {
  deepStrictEqual(ids("fee"), ["giving"]);
  deepStrictEqual(ids("teacher"), ["faculty"]);
  deepStrictEqual(ids("teachers"), ["faculty"]);
  deepStrictEqual(ids("oom"), []);
});

test("a title match outranks a body match", () => {
  deepStrictEqual(ids("class"), ["schedule", "calendar"]);
});

test("a boosted overview page outranks a passing mention", () => {
  const results = searchDocuments(
    [
      {
        id: "mention",
        title: "Assessment",
        section: "Education",
        href: "/a",
        text: "Homework is graded.",
      },
      {
        id: "overview",
        title: "Class webpages",
        section: "Education",
        href: "/b",
        text: "See homework for every class.",
        boost: 5,
      },
    ],
    "homework",
  );

  deepStrictEqual(
    results.map(({ document }) => document.id),
    ["overview", "mention"],
  );
});

test("the limit caps the number of results", () => {
  equal(searchDocuments(DOCUMENTS, "class", { limit: 1 }).length, 1);
});

test("highlighting marks whole matching words and keeps the rest", () => {
  deepStrictEqual(highlightText("Class teachers meet", ["teacher"]), [
    { text: "Class ", isMatch: false },
    { text: "teachers", isMatch: true },
    { text: " meet", isMatch: false },
  ]);
  deepStrictEqual(highlightText("Nothing here", []), [{ text: "Nothing here", isMatch: false }]);
});

test("a snippet is centred on the first match and marks it", () => {
  const [result] = searchDocuments(
    [
      {
        id: "long",
        title: "Long page",
        section: "Education",
        href: "/long",
        text: `${"word ".repeat(80)}Diwali party ${"word ".repeat(80)}`,
      },
    ],
    "diwali",
  );
  const text = result?.snippet.map((part) => part.text).join("") ?? "";

  equal(text.startsWith("…"), true);
  equal(text.endsWith("…"), true);
  deepStrictEqual(
    result?.snippet.filter((part) => part.isMatch).map((part) => part.text),
    ["Diwali"],
  );
});

test("the query param is read from the first value, trimmed and capped", () => {
  equal(parseSearchQuery("  homework "), "homework");
  equal(parseSearchQuery(["first", "second"]), "first");
  equal(parseSearchQuery(undefined), "");
  equal(parseSearchQuery("x".repeat(500)).length, 100);
});
