'use server'

import type { ActionResponse } from '@lib/types/action.types'

import * as v from 'valibot'

import { ContactFormSchema, type ContactFormInputs } from './contact.types'

export async function sendEmail(
  _: ActionResponse,
  formData: ContactFormInputs,
): Promise<ActionResponse> {
  const validatedFields = v.safeParse(ContactFormSchema, formData)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  // TODO: Send ✉️ once domain is added to Resend.

  if (!validatedFields.success)
    return {
      success: false,
      message: 'Please fill in all required fields.',
    }

  return {
    success: true,
    message: 'Email sent successfully.',
  }
}
