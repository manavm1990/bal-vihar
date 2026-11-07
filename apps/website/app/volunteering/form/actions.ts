"use server";

import * as v from "valibot";
import { type VolunteerApplicationInputs, VolunteerApplicationSchema } from "./types";

export async function submitVolunteerApplication(input: VolunteerApplicationInputs) {
  const validatedFields = v.safeParse(VolunteerApplicationSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    } as const;

  return {
    success: true,
    message:
      "Your application has been received. A member of the volunteer team will be in touch soon.",
  } as const;
}
