import useActionForm from "@lib/hooks/use-action-form";

import { submitDisclaimer } from "./actions";
import { DisclaimerFormSchema } from "./disclaimer.types";

const DEFAULT_VALUES = {
  address: "",
  agreed: false,
  childrenNames: "",
  parentGuardianName: "",
  parentsName: "",
  phone: "",
  signedDate: "",
} as const;

/** Disclaimer form state; submission goes to `submitDisclaimer`. */
export default function useDisclaimer() {
  return useActionForm({
    schema: DisclaimerFormSchema,
    defaultValues: DEFAULT_VALUES,
    action: submitDisclaimer,
  });
}
