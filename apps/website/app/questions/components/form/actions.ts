"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";
import { type ContactFormInputs, ContactFormSchema } from "./contact.types";

export async function sendEmail(input: ContactFormInputs): Promise<ActionResponse> {
  const validatedFields = v.safeParse(ContactFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // TODO: Send ✉️ (`validatedFields.output`) once domain is added to Resend.

  return {
    success: true,
    message: "Your message has been sent. We will get back to you as soon as we can.",
  } as const;
}
