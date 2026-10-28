"use client";

import { Checkbox, FileField, FormField, FormSubmit, Select } from "@components/ui/fields";
import { FormSuccess } from "@components/ui/form-success.client";
import { H2 } from "@components/ui/typography";
import { cn } from "@lib/utils";
import { Controller, type UseFormRegister } from "react-hook-form";
import {
  COLOR_OPTIONS,
  PAPER_LAYOUTS,
  PAPER_SIZES,
  PRINT_FILE_TYPES,
  PRINT_OPTIONS,
  type PrintRequestInputs,
  REQUESTER_ROLES,
} from "./types";
import usePrintRequest from "./use-print-request";

type ChoiceName = "color" | "layout" | "role";

const PAPER_SIZE_OPTIONS = [
  { value: "", label: "Select a paper size…" },
  ...PAPER_SIZES.map((size) => ({ value: size, label: size })),
];

const FILE_ACCEPT = PRINT_FILE_TYPES.join(",");

export default function PrintRequestForm() {
  const {
    register,
    control,
    errors,
    onSubmit,
    isPending,
    isCustomSize,
    successMessage,
    errorMessage,
  } = usePrintRequest();

  if (successMessage)
    return <FormSuccess title="Print request submitted" message={successMessage} />;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-8">
      <fieldset disabled={isPending} className="min-w-0 space-y-10">
        <legend className="sr-only">Print request form</legend>

        <section className="space-y-5">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Requester details
          </H2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <FormField
              label="Full name"
              autoComplete="name"
              required
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
            <ChoiceGroup
              legend="Your role"
              name="role"
              choices={REQUESTER_ROLES}
              register={register}
              error={errors.role?.message}
              className="sm:col-span-2"
            />
          </div>
        </section>

        <section className="space-y-5">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Print job details
          </H2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <FormField
              label="Due date"
              type="date"
              required
              {...register("dueDate")}
              error={errors.dueDate?.message}
            />
            <div aria-hidden="true" className="hidden sm:block" />
            <FormField
              label="Number of copies"
              required
              inputProps={{ inputMode: "numeric" }}
              {...register("copies")}
              error={errors.copies?.message}
            />
            <FormField
              label="Number of pages"
              required
              inputProps={{ inputMode: "numeric" }}
              {...register("pages")}
              error={errors.pages?.message}
            />
            <ChoiceGroup
              legend="Paper layout"
              name="layout"
              choices={PAPER_LAYOUTS}
              register={register}
              error={errors.layout?.message}
            />
            <ChoiceGroup
              legend="Color option"
              name="color"
              choices={COLOR_OPTIONS}
              register={register}
              error={errors.color?.message}
            />
            <Select
              id="paper-size"
              label="Paper size"
              required
              options={PAPER_SIZE_OPTIONS}
              {...register("paperSize")}
              error={errors.paperSize?.message}
            />
            {isCustomSize && (
              <FormField
                label="Custom paper size"
                required
                {...register("customPaperSize")}
                error={errors.customPaperSize?.message}
              />
            )}
            <fieldset className="min-w-0 space-y-3 sm:col-span-2">
              <legend className="text-foreground text-sm/6 font-semibold">Other options</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PRINT_OPTIONS.map((option) => (
                  <Checkbox
                    key={option}
                    id={`option-${option}`.replaceAll(" ", "-").toLowerCase()}
                    label={option}
                    value={option}
                    registration={register("options")}
                  />
                ))}
              </div>
            </fieldset>
            <Controller
              control={control}
              name="file"
              render={({ field, fieldState }) => (
                <FileField
                  label="File to be printed"
                  name={field.name}
                  accept={FILE_ACCEPT}
                  required
                  className="sm:col-span-2"
                  hint="PDF, Word, PowerPoint, JPG or PNG, under 3.5 MB."
                  error={fieldState.error?.message}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              label="Other comments"
              isTextArea
              rows={4}
              className="sm:col-span-2"
              {...register("comments")}
              error={errors.comments?.message}
            />
          </div>
        </section>

        <div aria-hidden="true" className="sr-only">
          <FormField
            label="Leave this field empty"
            autoComplete="off"
            inputProps={{ tabIndex: -1 }}
            {...register("website")}
          />
        </div>
      </fieldset>

      <FormSubmit
        label="Submit print request"
        pendingLabel="Submitting…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}

interface ChoiceGroupProps {
  legend: string;
  name: ChoiceName;
  choices: readonly string[];
  register: UseFormRegister<PrintRequestInputs>;
  error?: string;
  className?: string;
}

function ChoiceGroup({ legend, name, choices, register, error, className }: ChoiceGroupProps) {
  const errorId = `${name}-error`;

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      className={cn("min-w-0 space-y-2", className)}
    >
      <legend className="text-foreground text-sm/6 font-semibold">
        {legend}{" "}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice) => (
          <label key={choice} className="relative block">
            <input type="radio" value={choice} className="peer sr-only" {...register(name)} />
            <span className="border-input bg-background text-foreground hover:border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-focus-visible:outline-ring flex h-full min-h-12 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
              {choice}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="text-destructive mt-1 text-sm">
          {error}
        </p>
      )}
    </fieldset>
  );
}
