import { BaseFormSchema, PhoneSchema } from "@lib/types/form.types";
import * as v from "valibot";

export const EXPENSE_CATEGORIES = [
  "Academic",
  "Admin",
  "Community",
  "Diwali",
  "Diya Project",
  "Equipment",
  "Family Night",
  "Field Trip",
  "Graduation Day",
  "Holi",
  "Picnic",
  "Republic Day",
  "Snacks",
  "Supplies",
  "Teaching",
  "Website/IT",
  "Annual Day",
  "Walk/Run",
  "Other",
] as const;

export const MAX_EXPENSES = 5;

export const RECEIPT_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const;

/**
 * All receipts in one claim must fit in a single request. This stays below the 4 MB server action
 * limit in next.config.ts (and Vercel's ~4.5 MB request cap) with room for the form fields.
 */
export const MAX_TOTAL_RECEIPT_BYTES = 3.5 * 1024 * 1024;

const ReceiptSchema = v.pipe(
  v.file("Please attach the receipt."),
  v.mimeType(RECEIPT_TYPES, "The receipt must be a JPG, PNG or PDF file."),
  v.maxSize(MAX_TOTAL_RECEIPT_BYTES, "This file is too large. Receipts must be under 3.5 MB."),
);

const ExpenseItemSchema = v.pipe(
  v.object({
    date: v.pipe(
      v.string(),
      v.nonEmpty("Please enter the date of the expense."),
      v.isoDate("Please enter a valid date."),
      v.check(
        (input) => input <= new Date().toISOString().slice(0, 10),
        "The expense date cannot be in the future.",
      ),
    ),
    description: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("Please describe what was purchased."),
      v.maxLength(255, "Please keep the description under 255 characters."),
    ),
    category: v.pipe(v.string(), v.picklist(EXPENSE_CATEGORIES, "Please choose a category.")),
    amount: v.pipe(
      v.string(),
      v.trim(),
      v.regex(/^\d+(\.\d{1,2})?$/, "Please enter an amount like 25 or 25.50."),
      v.check((input) => Number(input) > 0, "The amount must be greater than zero."),
    ),
    comments: v.optional(
      v.pipe(
        v.string(),
        v.trim(),
        v.maxLength(255, "Please keep the comments under 255 characters."),
      ),
      "",
    ),
    receipt: v.optional(ReceiptSchema),
  }),
  v.forward(
    v.check((item) => item.receipt !== undefined, "Please attach the receipt."),
    ["receipt"],
  ),
);

export const ExpenseFormSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your full name.")),
  email: BaseFormSchema.entries.email,
  phone: PhoneSchema,
  address: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your street address.")),
  cityStateZip: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your city, state and zip.")),
  items: v.pipe(
    v.array(ExpenseItemSchema),
    v.minLength(1, "Please add at least one expense."),
    v.maxLength(MAX_EXPENSES, `You can claim up to ${MAX_EXPENSES} expenses at a time.`),
    v.check(
      (items) =>
        items.reduce((total, item) => total + (item.receipt?.size ?? 0), 0) <=
        MAX_TOTAL_RECEIPT_BYTES,
      "These receipts are too large to upload together. Keep them under 3.5 MB in total, or submit a second claim for the rest.",
    ),
  ),
});

export type ExpenseFormInputs = v.InferInput<typeof ExpenseFormSchema>;
