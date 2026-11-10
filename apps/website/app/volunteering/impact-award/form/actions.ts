"use server";

import { createFormAction } from "@lib/form";
import { parseAwardFormData } from "./data";
import { AwardApplicationSchema } from "./types";

export const submitAwardApplication = createFormAction({
  schema: AwardApplicationSchema,
  parse: parseAwardFormData,
  getSuccessMessage:
    "Your application has been received. The award team will be in touch if they need anything else.",
});
