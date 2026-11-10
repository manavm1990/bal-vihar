"use server";

import { createFormAction } from "@lib/form";
import { parseExpenseFormData } from "./data";
import { ExpenseFormSchema } from "./types";

export const submitExpense = createFormAction({
  schema: ExpenseFormSchema,
  parse: parseExpenseFormData,
  getSuccessMessage: (output) =>
    `Your expense claim has been submitted. Your claim number is ${createClaimId(output.name)}.`,
});

function createClaimId(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  const initials = [words[0], words.length > 1 ? words.at(-1) : undefined]
    .map((word) => word?.[0]?.toUpperCase() ?? "")
    .join("");

  return `${initials}${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`;
}
