import {
  BaseFormSchema,
  createRequiredCheck,
  createRequiredText,
  PhoneSchema,
} from "@lib/types/form.types";
import * as v from "valibot";

export const AWARD_AGE_GROUPS = ["Teens (11–15)", "Young adults (16–25)"] as const;

export const AWARD_GRADES = [
  "Middle school",
  "High school freshman",
  "High school sophomore",
  "High school junior",
  "High school senior",
] as const;

export const AWARD_WORK_AREAS = [
  "Student teacher",
  "Community service",
  "Social media",
  "Technology",
  "Event volunteer",
] as const;

export const AWARD_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

/**
 * All files in one application must fit in a single request. This stays below the 4 MB server
 * action limit in next.config.ts (and Vercel's ~4.5 MB request cap) with room for the form fields.
 */
export const MAX_TOTAL_AWARD_FILE_BYTES = 3.5 * 1024 * 1024;

const getTotalFileBytes = (files: (File | undefined)[]) =>
  files.reduce((total, file) => total + (file?.size ?? 0), 0);

const AwardFileSchema = v.pipe(
  v.file("Please attach a file."),
  v.mimeType(AWARD_FILE_TYPES, "The file must be a PDF, JPG, PNG or Excel (.xlsx) file."),
  v.maxSize(MAX_TOTAL_AWARD_FILE_BYTES, "This file is too large. Keep all files under 3.5 MB."),
);

const HoursSchema = v.pipe(
  v.string(),
  v.trim(),
  v.regex(/^\d+(\.\d{1,2})?$/, "Please enter hours like 12 or 12.5. Use 0 if you have none."),
);

export const AwardApplicationSchema = v.pipe(
  v.object({
    youthName: createRequiredText("Please enter the applicant's name."),
    dateOfBirth: v.pipe(
      v.string(),
      v.nonEmpty("Please enter the applicant's date of birth."),
      v.isoDate("Please enter a valid date."),
      v.check(
        (input) => input <= new Date().toISOString().slice(0, 10),
        "The date of birth cannot be in the future.",
      ),
    ),
    email: BaseFormSchema.entries.email,
    phone: PhoneSchema,
    address: createRequiredText("Please enter your mailing address."),
    ageGroup: v.pipe(v.string(), v.picklist(AWARD_AGE_GROUPS, "Please choose an age group.")),
    grade: v.pipe(v.string(), v.picklist(AWARD_GRADES, "Please choose the current grade.")),
    areas: v.pipe(
      v.array(v.picklist(AWARD_WORK_AREAS)),
      v.minLength(1, "Please choose at least one area of work."),
    ),
    events: v.optional(
      v.pipe(v.string(), v.trim(), v.maxLength(500, "Please keep this under 500 characters.")),
      "",
    ),
    bvHours: HoursSchema,
    outsideHours: HoursSchema,
    outsideOrganizations: createRequiredText(
      "Please list each organization, or enter N/A if you have no outside hours.",
    ),
    attendedTouchpoints: createRequiredCheck(
      "Please confirm that you attended both touchpoint meetings.",
    ),
    readGuidelines: createRequiredCheck("Please confirm that you have read the guidelines."),
    confirmedAccurate: createRequiredCheck("Please confirm that your information is accurate."),
    trackingLog: v.optional(AwardFileSchema),
    signOffProof: v.optional(AwardFileSchema),
    outsideProof: v.optional(AwardFileSchema),
  }),
  v.forward(
    v.check((input) => input.trackingLog !== undefined, "Please attach your tracking log."),
    ["trackingLog"],
  ),
  v.forward(
    v.check(
      (input) =>
        getTotalFileBytes([input.trackingLog, input.signOffProof, input.outsideProof]) <=
        MAX_TOTAL_AWARD_FILE_BYTES,
      "These files are too large to upload together. Keep them under 3.5 MB in total, or email the extras to the award coordinator.",
    ),
    ["trackingLog"],
  ),
);

export type AwardApplicationInputs = v.InferInput<typeof AwardApplicationSchema>;
