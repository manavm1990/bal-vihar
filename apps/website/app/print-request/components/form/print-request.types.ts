import { BaseFormSchema } from "@lib/types/form.types";
import * as v from "valibot";

export const REQUESTER_ROLES = ["Teacher", "Admin Staff"] as const;
export const PAPER_LAYOUTS = ["Portrait", "Landscape"] as const;
export const COLOR_OPTIONS = ["Black & White", "Color"] as const;
export const CUSTOM_PAPER_SIZE = "Custom paper size";
export const PAPER_SIZES = [
  "Letter (8.5 x 11)",
  "Legal (8.5 x 14)",
  "Ledger (11 x 17)",
  CUSTOM_PAPER_SIZE,
] as const;
export const PRINT_OPTIONS = ["Two-sided printing", "Stapled", "Booklet format"] as const;

export const PRINT_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
] as const;

/**
 * The file travels in the same request as the form fields. This stays below the 4 MB server action
 * limit in next.config.ts (and Vercel's ~4.5 MB request cap) with room for the fields.
 */
export const MAX_PRINT_FILE_BYTES = 3.5 * 1024 * 1024;

// Bal Vihar of St. Louis meets in Central time, so "today" must not roll over at UTC midnight.
const getToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

const CountSchema = (message: string) =>
  v.pipe(v.string(), v.trim(), v.regex(/^[1-9]\d{0,3}$/, message));

export const PrintRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your full name.")),
    email: BaseFormSchema.entries.email,
    role: v.picklist(REQUESTER_ROLES, "Please choose your role."),
    dueDate: v.pipe(
      v.string(),
      v.nonEmpty("Please enter the date the print job is due."),
      v.isoDate("Please enter a valid date."),
      v.check((input) => input >= getToday(), "The due date cannot be in the past."),
    ),
    copies: CountSchema("Please enter a whole number of copies, from 1 to 9999."),
    pages: CountSchema("Please enter a whole number of pages, from 1 to 9999."),
    layout: v.picklist(PAPER_LAYOUTS, "Please choose a paper layout."),
    color: v.picklist(COLOR_OPTIONS, "Please choose color or black & white."),
    paperSize: v.picklist(PAPER_SIZES, "Please choose a paper size."),
    customPaperSize: v.optional(
      v.pipe(
        v.string(),
        v.trim(),
        v.maxLength(255, "Please keep the paper size under 255 characters."),
      ),
      "",
    ),
    options: v.optional(v.array(v.picklist(PRINT_OPTIONS)), []),
    file: v.pipe(
      v.file("Please attach the file to be printed."),
      v.mimeType(PRINT_FILE_TYPES, "The file must be a PDF, Word, PowerPoint, JPG or PNG file."),
      v.maxSize(MAX_PRINT_FILE_BYTES, "This file is too large. It must be under 3.5 MB."),
    ),
    comments: v.optional(
      v.pipe(
        v.string(),
        v.trim(),
        v.maxLength(500, "Please keep the comments under 500 characters."),
      ),
      "",
    ),
    // Honeypot: hidden from people, so only bots fill it in.
    website: v.optional(v.string(), ""),
  }),
  v.forward(
    v.check(
      (input) => input.paperSize !== CUSTOM_PAPER_SIZE || input.customPaperSize !== "",
      "Please enter the custom paper size.",
    ),
    ["customPaperSize"],
  ),
);

export type PrintRequestInputs = v.InferInput<typeof PrintRequestSchema>;
