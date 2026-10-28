import useActionForm from "@lib/hooks/use-action-form";
import { type DefaultValues, useWatch } from "react-hook-form";
import { submitPrintRequest } from "./actions";
import { createPrintRequestFormData } from "./data";
import {
  CUSTOM_PAPER_SIZE,
  type PrintRequestInputs,
  type PrintRequestOutput,
  PrintRequestSchema,
} from "./types";

const DEFAULT_VALUES: DefaultValues<PrintRequestInputs> = {
  name: "",
  email: "",
  dueDate: "",
  copies: "",
  pages: "",
  customPaperSize: "",
  options: [],
  comments: "",
  website: "",
} as const;

export default function usePrintRequest() {
  const form = useActionForm<PrintRequestInputs, PrintRequestOutput>({
    schema: PrintRequestSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitPrintRequest(createPrintRequestFormData(values)),
  });
  const paperSize = useWatch({ control: form.control, name: "paperSize" });

  return { ...form, isCustomSize: paperSize === CUSTOM_PAPER_SIZE } as const;
}
