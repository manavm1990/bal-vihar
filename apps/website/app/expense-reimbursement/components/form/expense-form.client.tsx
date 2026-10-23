"use client";

import { Button } from "@components/ui/button";
import { FormField } from "@components/ui/form/field";
import { FileField } from "@components/ui/form/file-field";
import { FormSubmit } from "@components/ui/form/form-submit";
import { FormSuccess } from "@components/ui/form/form-success.client";
import { Select } from "@components/ui/form/select";
import { H2 } from "@components/ui/typography";
import { Controller, useFieldArray } from "react-hook-form";

import { EXPENSE_CATEGORIES, MAX_EXPENSES, RECEIPT_TYPES } from "./expense.types";
import useExpense, { EMPTY_EXPENSE } from "./use-expense";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select a category…" },
  ...EXPENSE_CATEGORIES.map((category) => ({ value: category, label: category })),
];

const RECEIPT_ACCEPT = RECEIPT_TYPES.join(",");

export default function ExpenseForm() {
  const expense = useExpense();
  const { register, control, errors, onSubmit, isPending, successMessage, errorMessage } = expense;
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  if (successMessage) return <FormSuccess title="Expense submitted" message={successMessage} />;

  const itemsError = errors.items?.message ?? errors.items?.root?.message;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-8">
      <fieldset disabled={isPending} className="min-w-0 space-y-10">
        <legend className="sr-only">Expense reimbursement form</legend>

        <section className="space-y-5">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Your details
          </H2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <FormField
              label="Full name"
              autoComplete="name"
              required
              className="sm:col-span-2"
              {...register("name")}
              error={errors.name?.message}
            />
            <FormField
              label="Email address"
              type="email"
              autoComplete="email"
              required
              {...register("email")}
              error={errors.email?.message}
            />
            <FormField
              label="Phone number"
              type="tel"
              autoComplete="tel"
              required
              {...register("phone")}
              error={errors.phone?.message}
            />
            <FormField
              label="Street address"
              autoComplete="street-address"
              required
              className="sm:col-span-2"
              {...register("address")}
              error={errors.address?.message}
            />
            <FormField
              label="City, state and zip"
              autoComplete="off"
              required
              className="sm:col-span-2"
              {...register("cityStateZip")}
              error={errors.cityStateZip?.message}
            />
          </div>
        </section>

        <section className="space-y-5">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Expenses
          </H2>

          {fields.map((field, index) => {
            const itemErrors = errors.items?.[index];

            return (
              <fieldset
                key={field.id}
                className="border-border min-w-0 space-y-5 rounded-lg border p-4 sm:p-5"
              >
                <legend className="text-foreground px-2 text-base font-semibold">
                  Expense {index + 1}
                </legend>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <FormField
                    label="Date of expense"
                    type="date"
                    required
                    {...register(`items.${index}.date`)}
                    error={itemErrors?.date?.message}
                  />
                  <FormField
                    label="Amount (USD)"
                    placeholder="0.00"
                    required
                    inputProps={{ inputMode: "decimal" }}
                    {...register(`items.${index}.amount`)}
                    error={itemErrors?.amount?.message}
                  />
                  <FormField
                    label="Description"
                    required
                    className="sm:col-span-2"
                    {...register(`items.${index}.description`)}
                    error={itemErrors?.description?.message}
                  />
                  <Select
                    id={`items-${index}-category`}
                    label="Category"
                    required
                    options={CATEGORY_OPTIONS}
                    {...register(`items.${index}.category`)}
                    error={itemErrors?.category?.message}
                  />
                  <FormField
                    label="Comments (optional)"
                    {...register(`items.${index}.comments`)}
                    error={itemErrors?.comments?.message}
                  />
                  <Controller
                    control={control}
                    name={`items.${index}.receipt`}
                    render={({ field: receipt, fieldState }) => (
                      <FileField
                        label="Receipt"
                        name={receipt.name}
                        accept={RECEIPT_ACCEPT}
                        required
                        className="sm:col-span-2"
                        hint="JPG, PNG or PDF. All receipts together must be under 3.5 MB."
                        error={fieldState.error?.message}
                        ref={receipt.ref}
                        onBlur={receipt.onBlur}
                        onChange={receipt.onChange}
                      />
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Remove expense ${index + 1}`}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove this expense
                  </Button>
                )}
              </fieldset>
            );
          })}

          {itemsError && (
            <p role="alert" className="text-destructive text-sm font-medium">
              {itemsError}
            </p>
          )}

          <Button
            type="button"
            variant="outline"
            disabled={fields.length >= MAX_EXPENSES}
            onClick={() => {
              append(EMPTY_EXPENSE);
            }}
          >
            Add another expense
          </Button>
        </section>
      </fieldset>

      <FormSubmit
        label="Submit expense claim"
        pendingLabel="Submitting…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}
