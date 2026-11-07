import useActionForm from "@lib/hooks/use-action-form";
import { sendEmail } from "./actions";
import { ContactFormSchema } from "./types";

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
} as const;

export default function useContact() {
  return useActionForm({
    schema: ContactFormSchema,
    defaultValues: DEFAULT_VALUES,
    action: sendEmail,
  });
}
