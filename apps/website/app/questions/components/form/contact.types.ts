import { BaseFormSchema, PhoneSchema } from "@lib/types/form.types";
import * as v from "valibot";

const ContactFieldsSchema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your first name.")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your last name.")),
  phone: PhoneSchema,
});

export const ContactFormSchema = v.object({
  ...BaseFormSchema.entries,
  ...ContactFieldsSchema.entries,
});

export type ContactFormInputs = v.InferInput<typeof ContactFormSchema>;
