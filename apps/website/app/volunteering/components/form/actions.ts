"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";
import {
  type VolunteerApplicationInputs,
  VolunteerApplicationSchema,
} from "./volunteer-application.types";

export async function submitVolunteerApplication(
  input: VolunteerApplicationInputs,
): Promise<ActionResponse> {
  const validatedFields = v.safeParse(VolunteerApplicationSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // TODO: Send ✉️ to the volunteer team with Resend (`validatedFields.output`) once the domain is added.

  return {
    success: true,
    message:
      "Your application has been received. A member of the volunteer team will be in touch soon.",
  } as const;
}
