"use server";

import { createFormAction } from "@lib/form";
import { parsePrintRequestFormData } from "./data";
import { PrintRequestSchema } from "./types";

export const submitPrintRequest = createFormAction({
  schema: PrintRequestSchema,
  parse: parsePrintRequestFormData,
  getSuccessMessage: "Your print request has been submitted.",
});
