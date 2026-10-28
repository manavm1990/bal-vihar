import useActionForm from "@lib/hooks/use-action-form";
import { submitGrievance } from "./actions";
import { GrievanceFormSchema } from "./types";

const DEFAULT_VALUES = {
  fullName: "",
  email: "",
  association: "",
  grievanceAgainst: "",
  message: "",
} as const;

export default function useGrievance() {
  return useActionForm({
    schema: GrievanceFormSchema,
    defaultValues: DEFAULT_VALUES,
    action: submitGrievance,
  });
}
