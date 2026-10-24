import { equal } from "node:assert/strict";
import { test } from "node:test";
import * as v from "valibot";
import { type PrintRequestInputs, PrintRequestSchema } from "./print-request.types";
import { fromPrintRequestFormData, toPrintRequestFormData } from "./print-request-form-data";

const file = (name = "worksheet.pdf", type = "application/pdf", size = 1024) =>
  new File([new Uint8Array(size)], name, { type });

const valid = (overrides: Partial<PrintRequestInputs> = {}): PrintRequestInputs => ({
  name: "Vish Tripathi",
  email: "vish@example.com",
  role: "Teacher",
  dueDate: "2999-01-01",
  copies: "25",
  pages: "2",
  layout: "Portrait",
  color: "Black & White",
  paperSize: "Letter (8.5 x 11)",
  customPaperSize: "",
  options: ["Two-sided printing"],
  file: file(),
  comments: "",
  website: "",
  ...overrides,
});

// Mirrors the real path: client builds FormData, server rebuilds the input and validates it.
const roundTrip = (input: PrintRequestInputs) =>
  v.safeParse(PrintRequestSchema, fromPrintRequestFormData(toPrintRequestFormData(input)));

test("a complete request survives the FormData round trip and validates", () => {
  const result = roundTrip(valid());
  equal(result.success, true);
  if (result.success) equal(result.output.file.name, "worksheet.pdf");
});

test("the file is required", () => {
  const empty = toPrintRequestFormData(valid());
  empty.delete("file");
  equal(v.safeParse(PrintRequestSchema, fromPrintRequestFormData(empty)).success, false);
});

test("the file must be a supported type", () => {
  equal(roundTrip(valid({ file: file("a.gif", "image/gif") })).success, false);
  equal(roundTrip(valid({ file: file("a.png", "image/png") })).success, true);
});

test("an oversized file is rejected", () => {
  equal(
    roundTrip(valid({ file: file("big.pdf", "application/pdf", 4 * 1024 * 1024) })).success,
    false,
  );
});

test("a custom paper size is required only when Custom is chosen", () => {
  equal(roundTrip(valid({ paperSize: "Custom paper size" })).success, false);
  equal(
    roundTrip(valid({ paperSize: "Custom paper size", customPaperSize: "5 x 7" })).success,
    true,
  );
});

test("past due dates, bad counts and unknown choices are rejected", () => {
  equal(roundTrip(valid({ dueDate: "2000-01-01" })).success, false);
  equal(roundTrip(valid({ copies: "0" })).success, false);
  equal(roundTrip(valid({ pages: "abc" })).success, false);
  equal(roundTrip(valid({ paperSize: "Bogus" as never })).success, false);
});

test("tampered payloads fail instead of throwing", () => {
  const empty = new FormData();
  equal(v.safeParse(PrintRequestSchema, fromPrintRequestFormData(empty)).success, false);
  const garbage = new FormData();
  garbage.set("fields", "{not json");
  equal(v.safeParse(PrintRequestSchema, fromPrintRequestFormData(garbage)).success, false);
  const stringFile = toPrintRequestFormData(valid());
  stringFile.set("file", "not a file");
  equal(v.safeParse(PrintRequestSchema, fromPrintRequestFormData(stringFile)).success, false);
});
