import useActionForm from "@lib/hooks/use-action-form";
import { submitVolunteerApplication } from "./actions";
import { VolunteerApplicationSchema } from "./volunteer-application.types";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  comments: "",
} as const;

/**
 * Volunteer application form state;
 * submission goes to `submitVolunteerApplication`.
 */
export default function useVolunteerApplication() {
  return useActionForm({
    schema: VolunteerApplicationSchema,
    defaultValues: DEFAULT_VALUES,
    action: submitVolunteerApplication,
  });
}
