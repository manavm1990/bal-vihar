import useActionForm from "@lib/hooks/use-action-form";
import { submitExpense } from "./actions";
import { createExpenseFormData } from "./data";
import { type ExpenseFormInputs, ExpenseFormSchema } from "./types";

export const EMPTY_EXPENSE = {
  date: "",
  description: "",
  category: "",
  amount: "",
  comments: "",
} as const;
const DEFAULT_VALUES: ExpenseFormInputs = {
  name: "",
  email: "",
  phone: "",
  address: "",
  cityStateZip: "",
  items: [EMPTY_EXPENSE],
} as const;

export default function useExpense() {
  return useActionForm({
    schema: ExpenseFormSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitExpense(createExpenseFormData(values)),
  });
}
