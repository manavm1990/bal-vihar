import { createRequiredCheck, createRequiredText, PhoneSchema } from "@lib/types/form.types";
import * as v from "valibot";

export const DisclaimerFormSchema = v.object({
  address: createRequiredText("Please enter your full address."),
  agreed: createRequiredCheck("Please confirm that you agree to the disclaimer."),
  childrenNames: createRequiredText("Please enter the child or children's names."),
  parentGuardianName: createRequiredText("Please print the parent or guardian name."),
  parentsName: createRequiredText("Please enter the parent(s) name."),
  phone: PhoneSchema,
  signedDate: v.pipe(
    v.string(),
    v.nonEmpty("Please enter the date."),
    v.isoDate("Please enter a valid date."),
  ),
});

export type DisclaimerFormInputs = v.InferInput<typeof DisclaimerFormSchema>;
