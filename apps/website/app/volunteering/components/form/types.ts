import { BaseFormSchema, PhoneSchema } from "@lib/form";
import * as v from "valibot";

export const VOLUNTEER_INTERESTS = [
  "Annual Picnic",
  "Diwali",
  "Family Night",
  "Holi",
  "Annual Day",
  "Teaching",
  "Other",
] as const;

export const VolunteerApplicationSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your name.")),
  email: BaseFormSchema.entries.email,
  phone: PhoneSchema,
  interest: v.pipe(
    v.string(),
    v.picklist(VOLUNTEER_INTERESTS, "Please choose what you are interested in."),
  ),
  comments: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.maxWords("en", 500, "That's a lot of information! Please keep it under 500 words."),
    ),
    "",
  ),
});

export type VolunteerApplicationInputs = v.InferInput<typeof VolunteerApplicationSchema>;
