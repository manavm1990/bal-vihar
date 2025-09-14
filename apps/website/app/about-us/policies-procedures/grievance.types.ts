import { BaseFormSchema } from '@lib/types/form.types'
import * as v from 'valibot'

const grievanceFieldsSchema = v.object({
  fullName: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Please enter your full name.'),
    v.check(
      (input) => input.includes(' ') && input.trim().split(' ').length >= 2,
      'Full name must include at least a first and last name separated by a space.',
    ),
  ),
})

export const GrievanceFormSchema = v.object({
  ...BaseFormSchema.entries,
  ...grievanceFieldsSchema.entries,
})

export type GrievanceFormInputs = v.InferInput<typeof GrievanceFormSchema>
