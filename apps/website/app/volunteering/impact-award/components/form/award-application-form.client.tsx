"use client";

import { FormField } from "@components/ui/form/field";
import { FileField } from "@components/ui/form/file-field";
import { FormSubmit } from "@components/ui/form/form-submit";
import { FormSuccess } from "@components/ui/form/form-success.client";
import { Select } from "@components/ui/form/select";
import { H3 } from "@components/ui/typography";
import { Controller, type UseFormRegisterReturn } from "react-hook-form";

import {
  AWARD_AGE_GROUPS,
  AWARD_FILE_TYPES,
  AWARD_GRADES,
  AWARD_WORK_AREAS,
} from "./award-application.types";
import useAwardApplication from "./use-award-application";

const FILE_ACCEPT = AWARD_FILE_TYPES.join(",");

const FILE_HINT = "PDF, JPG, PNG or Excel. All files together must be under 3.5 MB.";

const AGE_GROUP_OPTIONS = [
  { value: "", label: "Select an age group…" },
  ...AWARD_AGE_GROUPS.map((group) => ({ value: group, label: group })),
];

const GRADE_OPTIONS = [
  { value: "", label: "Select a grade…" },
  ...AWARD_GRADES.map((grade) => ({ value: grade, label: grade })),
];

export default function AwardApplicationForm() {
  const { register, control, errors, onSubmit, isPending, successMessage, errorMessage } =
    useAwardApplication();

  if (successMessage) return <FormSuccess title="Application submitted" message={successMessage} />;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-8">
      <fieldset disabled={isPending} className="min-w-0 space-y-10">
        <legend className="sr-only">B-VISION Impact Award application</legend>

        <section className="space-y-5">
          <H3 className="text-xl">About the applicant</H3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <FormField
              label="Name of applicant (last, first)"
              autoComplete="name"
              required
              {...register("youthName")}
              error={errors.youthName?.message}
            />
            <FormField
              label="Date of birth"
              type="date"
              required
              {...register("dateOfBirth")}
              error={errors.dateOfBirth?.message}
            />
            <FormField
              label="Contact email"
              type="email"
              autoComplete="email"
              required
              {...register("email")}
              error={errors.email?.message}
            />
            <FormField
              label="Contact phone number"
              type="tel"
              autoComplete="tel"
              required
              {...register("phone")}
              error={errors.phone?.message}
            />
            <FormField
              label="Mailing address"
              autoComplete="street-address"
              required
              className="sm:col-span-2"
              {...register("address")}
              error={errors.address?.message}
            />
            <Select
              id="age-group"
              label="Age group"
              required
              options={AGE_GROUP_OPTIONS}
              {...register("ageGroup")}
              error={errors.ageGroup?.message}
            />
            <Select
              id="grade"
              label="Current grade"
              required
              options={GRADE_OPTIONS}
              {...register("grade")}
              error={errors.grade?.message}
            />
          </div>
        </section>

        <section className="space-y-5">
          <H3 className="text-xl">Your service</H3>
          <fieldset
            aria-describedby={errors.areas ? "areas-error" : undefined}
            className="min-w-0 space-y-3"
          >
            <legend className="text-foreground text-sm/6 font-semibold">
              Area of work at Bal Vihar{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AWARD_WORK_AREAS.map((area) => (
                <Checkbox
                  key={area}
                  id={`area-${area}`.replaceAll(" ", "-").toLowerCase()}
                  label={area}
                  value={area}
                  registration={register("areas")}
                />
              ))}
            </div>
            {errors.areas && (
              <p id="areas-error" className="text-destructive text-sm">
                {errors.areas.message}
              </p>
            )}
          </fieldset>
          <FormField
            label="Bal Vihar events you supported (optional)"
            isTextArea
            rows={3}
            {...register("events")}
            error={errors.events?.message}
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <FormField
              label="Total hours at Bal Vihar"
              required
              inputProps={{ inputMode: "decimal" }}
              {...register("bvHours")}
              error={errors.bvHours?.message}
            />
            <FormField
              label="Total hours outside Bal Vihar"
              required
              inputProps={{ inputMode: "decimal" }}
              {...register("outsideHours")}
              error={errors.outsideHours?.message}
            />
          </div>
          <FormField
            label="Organizations where you volunteered outside Bal Vihar (enter N/A if none)"
            isTextArea
            rows={3}
            required
            {...register("outsideOrganizations")}
            error={errors.outsideOrganizations?.message}
          />
        </section>

        <section className="space-y-5">
          <H3 className="text-xl">Your files</H3>
          <div className="grid grid-cols-1 gap-6">
            <Controller
              control={control}
              name="trackingLog"
              render={({ field, fieldState }) => (
                <FileField
                  label="Tracking log"
                  name={field.name}
                  accept={FILE_ACCEPT}
                  required
                  hint={FILE_HINT}
                  error={fieldState.error?.message}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="signOffProof"
              render={({ field, fieldState }) => (
                <FileField
                  label="Sign-off emails for Bal Vihar hours"
                  name={field.name}
                  accept={FILE_ACCEPT}
                  hint="Save the emails as one PDF. See “Get your hours signed off” above."
                  error={fieldState.error?.message}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="outsideProof"
              render={({ field, fieldState }) => (
                <FileField
                  label="Proof of hours outside Bal Vihar (if any)"
                  name={field.name}
                  accept={FILE_ACCEPT}
                  hint="Combine certificates and letters into one PDF."
                  error={fieldState.error?.message}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </section>

        <section className="space-y-5">
          <H3 className="text-xl">Before you submit</H3>
          <Checkbox
            id="attended-touchpoints"
            label="I attended both touchpoint meetings."
            registration={register("attendedTouchpoints")}
            error={errors.attendedTouchpoints?.message}
          />
          <Checkbox
            id="read-guidelines"
            label="I have read the guidelines on this page."
            registration={register("readGuidelines")}
            error={errors.readGuidelines?.message}
          />
          <Checkbox
            id="confirmed-accurate"
            label="All the information I entered is accurate and true to the best of my knowledge, and I am not submitting these hours for an award through another organization."
            registration={register("confirmedAccurate")}
            error={errors.confirmedAccurate?.message}
          />
        </section>
      </fieldset>

      <FormSubmit
        label="Submit application"
        pendingLabel="Submitting…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}

interface CheckboxProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  value?: string;
  error?: string;
}

function Checkbox({ id, label, registration, value, error }: CheckboxProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="accent-secondary mt-1 size-5 shrink-0"
          {...registration}
        />
        <label htmlFor={id} className="text-foreground text-base">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
