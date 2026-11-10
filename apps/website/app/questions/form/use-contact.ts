import useActionForm from "@lib/hooks/use-action-form";
import { sendEmail } from "./actions";
import { ContactFormSchema } from "./types";

export default function useContact() {
  return useActionForm({
    schema: ContactFormSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    action: sendEmail,
  });
}
