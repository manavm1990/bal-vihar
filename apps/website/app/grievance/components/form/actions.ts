"use server";

import type { ActionResponse } from "@lib/types/action.types";

import * as v from "valibot";

import { type GrievanceFormInputs, GrievanceFormSchema } from "./grievance.types";

export async function submitGrievance(input: GrievanceFormInputs): Promise<ActionResponse> {
  const validatedFields = v.safeParse(GrievanceFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // TODO: Send ✉️ to the Grievance Committee with Resend (`validatedFields.output`, stamped with
  // the filing date) once the domain is added.

  return {
    success: true,
    message: "Your grievance has been submitted and will be reviewed by the Grievance Committee.",
  };
}
