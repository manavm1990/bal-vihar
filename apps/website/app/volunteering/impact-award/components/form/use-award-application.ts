import useActionForm from "@lib/hooks/use-action-form";
import { submitAwardApplication } from "./actions";
import { type AwardApplicationInputs, AwardApplicationSchema } from "./award-application.types";
import { toAwardFormData } from "./award-application-form-data";

const DEFAULT_VALUES: AwardApplicationInputs = {
  youthName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  address: "",
  ageGroup: "",
  grade: "",
  areas: [],
  events: "",
  bvHours: "",
  outsideHours: "",
  outsideOrganizations: "",
  attendedTouchpoints: false,
  readGuidelines: false,
  confirmedAccurate: false,
} as const;

/**
 * B-VISION Impact Award application form state; the tracking log and proof are uploaded with the
 * application via `submitAwardApplication`.
 */
export default function useAwardApplication() {
  return useActionForm({
    schema: AwardApplicationSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitAwardApplication(toAwardFormData(values)),
  });
}
