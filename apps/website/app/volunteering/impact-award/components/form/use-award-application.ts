import useActionForm from "@lib/hooks/use-action-form";
import { submitAwardApplication } from "./actions";
import { createAwardFormData } from "./data";
import { type AwardApplicationInputs, AwardApplicationSchema } from "./types";

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

export default function useAwardApplication() {
  return useActionForm({
    schema: AwardApplicationSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitAwardApplication(createAwardFormData(values)),
  });
}
