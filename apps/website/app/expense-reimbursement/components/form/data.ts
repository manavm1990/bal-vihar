import type { ExpenseFormInputs } from "./types";

export function createExpenseFormData({ items, ...claimant }: ExpenseFormInputs): FormData {
  const formData = new FormData();
  const itemsWithoutReceipts = items.map(({ receipt: _receipt, ...item }) => item);

  formData.set("fields", JSON.stringify({ ...claimant, items: itemsWithoutReceipts }));
  items.forEach(({ receipt }, index) => {
    if (receipt) formData.set(getReceiptKey(index), receipt);
  });

  return formData;
}

export function parseExpenseFormData(formData: FormData): unknown {
  const fieldsJson = formData.get("fields");
  if (typeof fieldsJson !== "string") return null;

  let fields: unknown;
  try {
    fields = JSON.parse(fieldsJson);
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
