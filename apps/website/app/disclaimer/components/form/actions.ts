"use server";

import * as v from "valibot";
import { type DisclaimerFormInputs, DisclaimerFormSchema } from "./types";

export async function submitDisclaimer(input: DisclaimerFormInputs) {
  const validatedFields = v.safeParse(DisclaimerFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  return {
    success: true,
    message: "Your disclaimer has been recorded. Thank you.",
  } as const;
}
