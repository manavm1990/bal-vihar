"use server";

import { createFormAction } from "@lib/form";
import { type ContactFormInputs, ContactFormSchema } from "./types";

export const sendEmail = createFormAction({
  schema: ContactFormSchema,
  parse: (input: ContactFormInputs) => input,
  getSuccessMessage: "Your message has been sent. We will get back to you as soon as we can.",
});
