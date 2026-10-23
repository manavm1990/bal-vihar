"use server";

import type { ActionResponse } from "@lib/types/action.types";
import * as v from "valibot";
import { ExpenseFormSchema } from "./expense.types";
import { fromExpenseFormData } from "./expense-form-data";

/**
 * Create a claim ID based on the first initial of the first and last name plus
 * today's date.
 *
 * For example, "VT20261023" for a user named "Vinayak Thakur,"
 * on October 23, 2026.
 *
 * @param name - The full name of the claimant.
 * @returns The generated claim ID.
 */
function createClaimId(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  const initials = [words[0], words.length > 1 ? words.at(-1) : undefined]
    .map((word) => word?.[0]?.toUpperCase() ?? "")
    .join("");

  return `${initials}${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`;
}

export async function submitExpense(formData: FormData): Promise<ActionResponse> {
  const validatedFields = v.safeParse(ExpenseFormSchema, fromExpenseFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  const claimId = createClaimId(validatedFields.output.name);

  // TODO: Send ✉️ to the treasurer with Resend once the domain is added: the claimant and expenses
  // from `validatedFields.output`, subject "Expense claim <claimId>", and each receipt attached
  // (`Buffer.from(await item.receipt.arrayBuffer())`).

  return {
    success: true,
    message: `Your expense claim has been submitted. Your claim number is ${claimId}.`,
  } as const;
}
