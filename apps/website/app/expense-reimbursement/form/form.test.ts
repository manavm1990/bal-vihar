import { equal } from "node:assert/strict";
import { test } from "node:test";
import * as v from "valibot";
import { createExpenseFormData, parseExpenseFormData } from "./data";
import { type ExpenseFormInputs, ExpenseFormSchema } from "./types";

const receipt = (name = "receipt.pdf", type = "application/pdf", size = 1024) =>
  new File([new Uint8Array(size)], name, { type });

const valid = (overrides: Partial<ExpenseFormInputs["items"][number]> = {}): ExpenseFormInputs => ({
  name: "Vish Tripathi",
  email: "vish@example.com",
  phone: "+1 314 555 0123",
  address: "1 Main St",
  cityStateZip: "St. Louis, MO 63011",
  items: [
    {
      date: "2026-09-01",
      description: "Diwali supplies",
      category: "Diwali",
      amount: "42.50",
      comments: "",
      receipt: receipt(),
      ...overrides,
    },
  ],
});

const roundTrip = (input: ExpenseFormInputs) =>
  v.safeParse(ExpenseFormSchema, parseExpenseFormData(createExpenseFormData(input)));

test("a complete claim survives the FormData round trip and validates", () => {
  const result = roundTrip(valid());
  equal(result.success, true);
  if (result.success) equal(result.output.items[0]?.receipt?.name, "receipt.pdf");
});

test("every expense needs its receipt", () => {
  equal(roundTrip(valid({ receipt: undefined })).success, false);
});

test("receipts must be JPG, PNG or PDF", () => {
  equal(roundTrip(valid({ receipt: receipt("a.gif", "image/gif") })).success, false);
  equal(roundTrip(valid({ receipt: receipt("a.jpg", "image/jpeg") })).success, true);
});

test("an oversized receipt is rejected", () => {
  equal(
    roundTrip(valid({ receipt: receipt("big.pdf", "application/pdf", 4 * 1024 * 1024) })).success,
    false,
  );
});

test("receipts that are only too large together are rejected", () => {
  const two = valid();
  const first = two.items[0];
  if (!first) throw new Error("fixture");
  const bulky = { ...first, receipt: receipt("a.pdf", "application/pdf", 2 * 1024 * 1024) };
  two.items = [bulky, { ...bulky, receipt: receipt("b.pdf", "application/pdf", 2 * 1024 * 1024) }];
  equal(roundTrip(two).success, false);
});

test("tampered payloads fail instead of throwing", () => {
  const empty = new FormData();
  equal(v.safeParse(ExpenseFormSchema, parseExpenseFormData(empty)).success, false);
  const garbage = new FormData();
  garbage.set("fields", "{not json");
  equal(v.safeParse(ExpenseFormSchema, parseExpenseFormData(garbage)).success, false);
  const stringReceipt = createExpenseFormData(valid());
  stringReceipt.set("receipt-0", "not a file");
  equal(v.safeParse(ExpenseFormSchema, parseExpenseFormData(stringReceipt)).success, false);
});

test("a claim can hold at most five expenses", () => {
  const input = valid();
  const first = input.items[0];
  if (!first) throw new Error("fixture");
  input.items = Array.from({ length: 6 }, () => ({
    ...first,
    receipt: receipt("r.pdf", "application/pdf", 100),
  }));
  equal(roundTrip(input).success, false);
});
