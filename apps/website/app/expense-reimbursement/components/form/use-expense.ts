import useActionForm from "@lib/hooks/use-action-form";
import { submitExpense } from "./actions";
import { type ExpenseFormInputs, ExpenseFormSchema } from "./expense.types";
import { toExpenseFormData } from "./expense-form-data";

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

/**
 * Expense reimbursement form state; receipts are uploaded with
 *  the claim via `submitExpense`.
 */
export default function useExpense() {
  return useActionForm({
    schema: ExpenseFormSchema,
    defaultValues: DEFAULT_VALUES,
    action: (values) => submitExpense(toExpenseFormData(values)),
  });
}
