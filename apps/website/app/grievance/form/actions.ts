"use server";

import { createFormAction } from "@lib/form";
import { type GrievanceFormInputs, GrievanceFormSchema } from "./types";

export const submitGrievance = createFormAction({
  schema: GrievanceFormSchema,
  parse: (input: GrievanceFormInputs) => input,
  getSuccessMessage:
    "Your grievance has been submitted and will be reviewed by the Grievance Committee.",
});
