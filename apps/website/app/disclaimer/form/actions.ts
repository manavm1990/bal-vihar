"use server";

import { createFormAction } from "@lib/form";
import { type DisclaimerFormInputs, DisclaimerFormSchema } from "./types";

export const submitDisclaimer = createFormAction({
  schema: DisclaimerFormSchema,
  parse: (input: DisclaimerFormInputs) => input,
  getSuccessMessage: "Your disclaimer has been recorded. Thank you.",
});
