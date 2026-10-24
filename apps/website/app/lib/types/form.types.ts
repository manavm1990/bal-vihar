import * as v from "valibot";
import isMobilePhone from "validator/lib/isMobilePhone";

export const BaseFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minWords("en", 10, "Please share more details."),
    v.maxWords("en", 500, "That's a lot of information! Please keep it under 500 words."),
  ),
});

export const createRequiredCheck = (message: string) =>
  v.pipe(
    v.boolean(),
    v.check((input) => input === true, message),
  );

export const createRequiredText = (message: string) =>
  v.pipe(v.string(), v.trim(), v.nonEmpty(message));

export const PhoneSchema = v.pipe(
  v.string(),
  v.trim(),
  v.check((input) => isMobilePhone(input), "Please enter a valid phone number."),
);
