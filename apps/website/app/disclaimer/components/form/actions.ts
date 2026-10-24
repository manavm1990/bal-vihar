"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";

import { type DisclaimerFormInputs, DisclaimerFormSchema } from "./disclaimer.types";

export async function submitDisclaimer(input: DisclaimerFormInputs): Promise<ActionResponse> {
  const validatedFields = v.safeParse(DisclaimerFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // TODO: Send ✉️ with Resend (`validatedFields.output`) once the domain is added.

  return {
    success: true,
    message: "Your disclaimer has been recorded. Thank you.",
  } as const;
}
