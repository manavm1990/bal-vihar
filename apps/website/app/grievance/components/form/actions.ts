"use server";

import * as v from "valibot";
import { type GrievanceFormInputs, GrievanceFormSchema } from "./types";

export async function submitGrievance(input: GrievanceFormInputs) {
  const validatedFields = v.safeParse(GrievanceFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  return {
    success: true,
    message: "Your grievance has been submitted and will be reviewed by the Grievance Committee.",
  };
}
