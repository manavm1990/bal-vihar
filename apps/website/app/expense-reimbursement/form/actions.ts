"use server";

import * as v from "valibot";
import { parseExpenseFormData } from "./data";
import { ExpenseFormSchema } from "./types";

function createClaimId(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  const initials = [words[0], words.length > 1 ? words.at(-1) : undefined]
    .map((word) => word?.[0]?.toUpperCase() ?? "")
    .join("");

  return `${initials}${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`;
}

export async function submitExpense(formData: FormData) {
  const validatedFields = v.safeParse(ExpenseFormSchema, parseExpenseFormData(formData));

  if (!validatedFields.success)
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
    };

  const claimId = createClaimId(validatedFields.output.name);

  return {
    success: true,
    message: `Your expense claim has been submitted. Your claim number is ${claimId}.`,
  } as const;
}
