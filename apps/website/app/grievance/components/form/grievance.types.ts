import { BaseFormSchema } from "@lib/types/form.types";
import * as v from "valibot";

export const GRIEVANCE_ASSOCIATIONS = ["Teacher", "Parent", "Volunteer", "Other"] as const;

export const GrievanceFormSchema = v.object({
  fullName: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Please enter your full name."),
    v.check((input) => input.split(/\s+/).length >= 2, "Please include your first and last name."),
  ),
  email: BaseFormSchema.entries.email,
  association: v.pipe(
    v.string(),
    v.picklist(GRIEVANCE_ASSOCIATIONS, "Please choose your association with Bal Vihar."),
  ),
  grievanceAgainst: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Please enter who the grievance is against."),
  ),
  message: BaseFormSchema.entries.message,
});

export type GrievanceFormInputs = v.InferInput<typeof GrievanceFormSchema>;
