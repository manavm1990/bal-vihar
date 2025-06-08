import * as v from 'valibot'

import {
  grievanceSchema,
  type GrievanceActionResponse,
  type GrievanceFormData,
} from './grievance.types'

export async function submitGrievance(
  _: GrievanceActionResponse,
  formData: GrievanceFormData,
): Promise<GrievanceActionResponse> {
  const validatedFields = v.safeParse(grievanceSchema, formData)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
    }
  }

  // TODO: Implement actual grievance submission logic (e.g., save to database or send email).

  return {
    success: true,
    message: 'Grievance submitted successfully.',
  }
}
