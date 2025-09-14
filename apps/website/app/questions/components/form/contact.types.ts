import { BaseFormSchema } from '@lib/types/form.types'
import * as v from 'valibot'
import isMobilePhone from 'validator/lib/isMobilePhone'

const ContactFieldsSchema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty('Please enter your first name.')),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty('Please enter your last name.')),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.check((input) => isMobilePhone(input), 'Please enter a valid phone number.'),
  ),
})

export const ContactFormSchema = v.object({
  ...BaseFormSchema.entries,
  ...ContactFieldsSchema.entries,
})

export type ContactFormInputs = v.InferInput<typeof ContactFormSchema>
