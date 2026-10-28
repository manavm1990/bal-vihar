"use server";

import * as v from "valibot";
import { parsePrintRequestFormData } from "./data";
import { PrintRequestSchema } from "./types";

const SUCCESS = {
  success: true,
  message: "Your print request has been submitted.",
} as const;

export async function submitPrintRequest(formData: FormData) {
  const validatedFields = v.safeParse(PrintRequestSchema, parsePrintRequestFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    } as const;

  if (validatedFields.output.website !== "") return SUCCESS;

  return SUCCESS;
}
