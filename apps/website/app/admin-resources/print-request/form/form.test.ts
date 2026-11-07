import { equal } from "node:assert/strict";
import { test } from "node:test";
import * as v from "valibot";
import { createPrintRequestFormData, parsePrintRequestFormData } from "./data";
import { type PrintRequestInputs, PrintRequestSchema } from "./types";

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

const roundTrip = (input: PrintRequestInputs) =>
  v.safeParse(PrintRequestSchema, parsePrintRequestFormData(createPrintRequestFormData(input)));

test("a complete request survives the FormData round trip and validates", () => {
  const result = roundTrip(valid());
  equal(result.success, true);
  if (result.success) equal(result.output.file.name, "worksheet.pdf");
});

test("the file is required", () => {
  const empty = createPrintRequestFormData(valid());
  empty.delete("file");
  equal(v.safeParse(PrintRequestSchema, parsePrintRequestFormData(empty)).success, false);
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

test("tampered payloads fail instead of throwing", () => {
  const empty = new FormData();
  equal(v.safeParse(PrintRequestSchema, parsePrintRequestFormData(empty)).success, false);
  const garbage = new FormData();
  garbage.set("fields", "{not json");
  equal(v.safeParse(PrintRequestSchema, parsePrintRequestFormData(garbage)).success, false);
  const stringFile = createPrintRequestFormData(valid());
  stringFile.set("file", "not a file");
  equal(v.safeParse(PrintRequestSchema, parsePrintRequestFormData(stringFile)).success, false);
});
