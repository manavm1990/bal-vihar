import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";

import { parseHighlightedText } from "./algolia";
import { HIGHLIGHT_END, HIGHLIGHT_START } from "./algolia-config";

test("marked-up text becomes plain parts, with matches flagged", () => {
  deepStrictEqual(
    parseHighlightedText(
      `Class ${HIGHLIGHT_START}homework${HIGHLIGHT_END} and ${HIGHLIGHT_START}forms${HIGHLIGHT_END} here`,
    ),
    [
      { text: "Class ", isMatch: false },
      { text: "homework", isMatch: true },
      { text: " and ", isMatch: false },
      { text: "forms", isMatch: true },
      { text: " here", isMatch: false },
    ],
  );
});

test("text with no marks is a single plain part, and empty text has none", () => {
  deepStrictEqual(parseHighlightedText("Nothing marked"), [
    { text: "Nothing marked", isMatch: false },
  ]);
  deepStrictEqual(parseHighlightedText(""), []);
});

test("HTML in the text stays plain text", () => {
  deepStrictEqual(
    parseHighlightedText(`<script>alert(1)</script> ${HIGHLIGHT_START}hi${HIGHLIGHT_END}`),
    [
      { text: "<script>alert(1)</script> ", isMatch: false },
      { text: "hi", isMatch: true },
    ],
  );
});
