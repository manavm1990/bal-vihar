"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";
import { PrintRequestSchema } from "./print-request.types";
import { fromPrintRequestFormData } from "./print-request-form-data";

const SUCCESS = {
  success: true,
  message: "Your print request has been submitted.",
} as const;

export async function submitPrintRequest(formData: FormData): Promise<ActionResponse> {
  const validatedFields = v.safeParse(PrintRequestSchema, fromPrintRequestFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // Bots fill the hidden honeypot; they get the same answer as everyone else and nothing is sent.
  if (validatedFields.output.website !== "") return SUCCESS;

  // TODO: Send ✉️ to the print coordinator with Resend once the domain is added: the requester and
  // job details from `validatedFields.output`, replyTo the requester's email, subject "Print
  // request from <name>", and the file attached (`Buffer.from(await file.arrayBuffer())`).

  return SUCCESS;
}
