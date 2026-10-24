import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";

import { parseHighlightedText } from "./algolia";

test("marked-up text becomes plain parts, with matches flagged", () => {
  deepStrictEqual(parseHighlightedText("Class ⟦homework⟧ and ⟦forms⟧ here"), [
    { text: "Class ", isMatch: false },
    { text: "homework", isMatch: true },
    { text: " and ", isMatch: false },
    { text: "forms", isMatch: true },
    { text: " here", isMatch: false },
  ]);
});

test("text with no marks is a single plain part, and empty text has none", () => {
  deepStrictEqual(parseHighlightedText("Nothing marked"), [
    { text: "Nothing marked", isMatch: false },
  ]);
  deepStrictEqual(parseHighlightedText(""), []);
});

test("HTML in the text stays plain text", () => {
  deepStrictEqual(parseHighlightedText("<script>alert(1)</script> ⟦hi⟧"), [
    { text: "<script>alert(1)</script> ", isMatch: false },
    { text: "hi", isMatch: true },
  ]);
});
