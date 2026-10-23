"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";
import { AwardApplicationSchema } from "./award-application.types";
import { fromAwardFormData } from "./award-application-form-data";

export async function submitAwardApplication(formData: FormData): Promise<ActionResponse> {
  const validatedFields = v.safeParse(AwardApplicationSchema, fromAwardFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  // TODO: Send ✉️ to the award coordinator (AWARD_CONTACT.email) with Resend once the domain is
  // added: the youth and guardian details and hours from `validatedFields.output`, subject
  // "B-VISION Impact Award application: <youthName>", and the tracking log and proof files
  // attached (`Buffer.from(await file.arrayBuffer())`).

  return {
    success: true,
    message:
      "Your application has been received. The award team will be in touch if they need anything else.",
  } as const;
}
