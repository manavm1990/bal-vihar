import * as v from 'valibot'
import isMobilePhone from 'validator/lib/isMobilePhone'

export interface ActionResponse {
  success: boolean
  message: string
}

export const contactSchema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty('Please enter your first name.')),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty('Please enter your last name.')),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Please enter your email.'),
    v.email('The email address is badly formatted.'),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.check((input) => isMobilePhone(input), 'Please enter a valid phone number.'),
  ),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minWords('en', 10, 'Please share more details.'),
    v.maxWords('en', 500, "That's a lot of information! Please keep it under 500 words."),
  ),
})

export type ContactFormData = v.InferInput<typeof contactSchema>
