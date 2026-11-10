import useActionForm from "@lib/hooks/use-action-form";
import { submitAwardApplication } from "./actions";
import { createAwardFormData } from "./data";
import { AwardApplicationSchema } from "./types";

export default function useAwardApplication() {
  return useActionForm({
    schema: AwardApplicationSchema,
    defaultValues: {
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
    },
    action: (values) => submitAwardApplication(createAwardFormData(values)),
  });
}
