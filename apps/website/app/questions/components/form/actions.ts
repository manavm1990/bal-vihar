"use server";

import * as v from "valibot";
import { type ContactFormInputs, ContactFormSchema } from "./types";

export async function sendEmail(input: ContactFormInputs) {
  const validatedFields = v.safeParse(ContactFormSchema, input);

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  return {
    success: true,
    message: "Your message has been sent. We will get back to you as soon as we can.",
  } as const;
}
