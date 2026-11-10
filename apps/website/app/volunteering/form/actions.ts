"use server";

import { createFormAction } from "@lib/form";
import { type VolunteerApplicationInputs, VolunteerApplicationSchema } from "./types";

export const submitVolunteerApplication = createFormAction({
  schema: VolunteerApplicationSchema,
  parse: (input: VolunteerApplicationInputs) => input,
  getSuccessMessage:
    "Your application has been received. A member of the volunteer team will be in touch soon.",
});
