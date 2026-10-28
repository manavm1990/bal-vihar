import useActionForm from "@lib/hooks/use-action-form";
import { submitVolunteerApplication } from "./actions";
import { VolunteerApplicationSchema } from "./types";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  comments: "",
} as const;

export default function useVolunteerApplication() {
  return useActionForm({
    schema: VolunteerApplicationSchema,
    defaultValues: DEFAULT_VALUES,
    action: submitVolunteerApplication,
  });
}
