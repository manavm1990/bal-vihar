import * as v from 'valibot'

export const BaseFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Please enter your email.'),
    v.email('The email address is badly formatted.'),
  ),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minWords('en', 10, 'Please share more details.'),
    v.maxWords('en', 500, "That's a lot of information! Please keep it under 500 words."),
  ),
})
