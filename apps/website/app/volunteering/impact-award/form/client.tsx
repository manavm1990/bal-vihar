"use client";

import { Checkbox, FileField, FormField, FormSubmit, Select } from "@components/ui/fields";
import { FormSuccess } from "@components/ui/form-success.client";
import { H3 } from "@components/ui/typography";
import { Controller } from "react-hook-form";
import useAwardApplication from "./use-award-application";

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
              options={[
                { value: "", label: "Select an age group…" },
                { value: "Teens (11–15)", label: "Teens (11–15)" },
                { value: "Young adults (16–18)", label: "Young adults (16–18)" },
              ]}
              {...register("ageGroup")}
              error={errors.ageGroup?.message}
            />

            <Select
              id="grade"
              label="Current grade"
              required
              options={[
                { value: "", label: "Select a grade…" },
                { value: "Middle school", label: "Middle school" },
                { value: "High school freshman", label: "High school freshman" },
                { value: "High school sophomore", label: "High school sophomore" },
                { value: "High school junior", label: "High school junior" },
                { value: "High school senior", label: "High school senior" },
              ]}
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
              {[
                "Student teacher",
                "Community service",
                "Social media",
                "Technology",
                "Event volunteer",
              ].map((area) => (
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
                  accept="application/pdf,image/jpeg,image/png,.xlsx"
                  required
                  hint="PDF, JPG, PNG or Excel. All files together must be under 3.5 MB."
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
                  accept="application/pdf,image/jpeg,image/png,.xlsx"
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
                  accept="application/pdf,image/jpeg,image/png,.xlsx"
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
