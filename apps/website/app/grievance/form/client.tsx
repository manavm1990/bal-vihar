"use client";

import { FormField, FormSubmit, Select } from "@components/ui/fields";
import { FormSuccess } from "@components/ui/form-success.client";
import { GRIEVANCE_ASSOCIATIONS } from "./types";
import useGrievance from "./use-grievance";

const ASSOCIATION_OPTIONS = [
  { value: "", label: "Select one…" },
  ...GRIEVANCE_ASSOCIATIONS.map((association) => ({ value: association, label: association })),
];

export default function GrievanceForm() {
  const { register, errors, onSubmit, isPending, successMessage, errorMessage } = useGrievance();

  if (successMessage) return <FormSuccess title="Grievance submitted" message={successMessage} />;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-6">
      <fieldset
        disabled={isPending}
        className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        <legend className="sr-only">Grievance form</legend>
        <FormField
          label="Your full name"
          autoComplete="name"
          required
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <FormField
          label="Email address"
          type="email"
          autoComplete="email"
          required
          {...register("email")}
          error={errors.email?.message}
        />
        <Select
          id="association"
          label="Your association with Bal Vihar"
          required
          options={ASSOCIATION_OPTIONS}
          {...register("association")}
          error={errors.association?.message}
        />
        <FormField
          label="Grievance against"
          placeholder="Full name of person"
          required
          {...register("grievanceAgainst")}
          error={errors.grievanceAgainst?.message}
        />
        <FormField
          label="Nature of grievance"
          isTextArea
          rows={5}
          required
          className="sm:col-span-2"
          {...register("message")}
          error={errors.message?.message}
        />
      </fieldset>
      <FormSubmit
        label="Submit grievance"
        pendingLabel="Submitting…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}
