"use server";

import * as v from "valibot";
import { parseAwardFormData } from "./data";
import { AwardApplicationSchema } from "./types";

export async function submitAwardApplication(formData: FormData) {
  const validatedFields = v.safeParse(AwardApplicationSchema, parseAwardFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    } as const;

  return {
    success: true,
    message:
      "Your application has been received. The award team will be in touch if they need anything else.",
  } as const;
}
