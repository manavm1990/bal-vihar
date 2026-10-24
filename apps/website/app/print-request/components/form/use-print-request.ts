import useActionForm from "@lib/hooks/use-action-form";
import { type DefaultValues, useWatch } from "react-hook-form";
import { submitPrintRequest } from "./actions";
import {
  CUSTOM_PAPER_SIZE,
  type PrintRequestInputs,
  PrintRequestSchema,
} from "./print-request.types";
import { toPrintRequestFormData } from "./print-request-form-data";

const DEFAULT_VALUES: DefaultValues<PrintRequestInputs> = {
  name: "",
  email: "",
  dueDate: "",
  copies: "",
  pages: "",
  paperSize: "",
  customPaperSize: "",
  options: [],
  comments: "",
  website: "",
};

/**
 * Print request form state; the file is uploaded with the request via `submitPrintRequest`.
 */
export default function usePrintRequest() {
  const form = useActionForm({
    schema: PrintRequestSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitPrintRequest(toPrintRequestFormData(values)),
  });
  const paperSize = useWatch({ control: form.control, name: "paperSize" });

  return { ...form, isCustomSize: paperSize === CUSTOM_PAPER_SIZE } as const;
}
