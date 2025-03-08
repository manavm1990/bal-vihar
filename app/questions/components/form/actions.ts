'use server'

import * as v from 'valibot'
import { contactSchema, type ActionResponse, type ContactFormData } from './contact.types'

export async function sendEmail(
  _: ActionResponse,
  formData: ContactFormData,
): Promise<ActionResponse> {
  const validatedFields = v.safeParse(contactSchema, formData)

  await new Promise((resolve) => setTimeout(resolve, 3000))

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
