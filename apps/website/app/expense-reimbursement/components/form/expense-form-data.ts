import type { ExpenseFormInputs } from "./expense.types";

/**
 * Rebuilds the unvalidated input on the server;
 * the schema decides whether it is acceptable.
 */
export function fromExpenseFormData(formData: FormData): unknown {
  const raw = formData.get("fields");
  if (typeof raw !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof fields !== "object" || fields === null || !("items" in fields)) return fields;

  if (!Array.isArray(fields.items)) return fields;

  return {
    ...fields,
    items: fields.items.map((item: unknown, index: number) =>
      typeof item === "object" && item !== null
        ? { ...item, receipt: formData.get(getReceiptKey(index)) ?? undefined }
        : item,
    ),
  } as const;
}

const getReceiptKey = (index: number) => `receipt-${index}`;

/**
 * Server actions take `FormData` for uploads:
 * the fields travel as JSON, each receipt as a file.
 */
export function toExpenseFormData({ items, ...claimant }: ExpenseFormInputs): FormData {
  const formData = new FormData();

  formData.set(
    "fields",
    JSON.stringify({ ...claimant, items: items.map(({ receipt: _receipt, ...item }) => item) }),
  );
  items.forEach((item, index) => {
    if (item.receipt) formData.set(getReceiptKey(index), item.receipt);
  });

  return formData;
}
