"use client";

import { Card } from "@components/ui/card";
import { FormField, FormSubmit } from "@components/ui/fields";
import { FormSuccess } from "@components/ui/form-success.client";
import { H2, H3 } from "@components/ui/typography";
import { motion, useReducedMotion } from "motion/react";
import type { UseFormRegister } from "react-hook-form";
import { VOLUNTEER_INTERESTS, type VolunteerApplicationInputs } from "./types";
import useVolunteerApplication from "./use-volunteer-application";

export default function VolunteerApplicationForm() {
  const { register, errors, onSubmit, isPending, successMessage, errorMessage } =
    useVolunteerApplication();
  const shouldReduceMotion = useReducedMotion();

  if (successMessage)
    return (
      <Card className="overflow-hidden">
        <TricolorBand />
        <div className="p-5 sm:p-8">
          <FormSuccess title="Thank you for volunteering!" message={successMessage} />
        </div>
      </Card>
    );

  return (
    <Card className="overflow-hidden">
      <TricolorBand />
      <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-8 p-5 sm:p-8">
        <header className="space-y-2">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Tell us how you would like to help
          </H2>
          <p className="text-muted-foreground text-sm">
            Fields marked{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>
        </header>

        <fieldset
          disabled={isPending}
          className="min-w-0 space-y-10 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0"
        >
          <legend className="sr-only">Volunteer application</legend>

          <motion.section className="space-y-5" {...getRevealProps(0, shouldReduceMotion)}>
            <StepHeading number="01" title="About you" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
              <FormField
                label="Your name"
                autoComplete="name"
                required
                className="sm:col-span-2 lg:col-span-1"
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
            </div>
          </motion.section>

          <motion.section className="space-y-5" {...getRevealProps(1, shouldReduceMotion)}>
            <StepHeading number="02" title="Where you would like to help" />
            <InterestChoices register={register} error={errors.interest?.message} />
            <FormField
              label="Comments"
              isTextArea
              rows={4}
              {...register("comments")}
              error={errors.comments?.message}
            />
          </motion.section>
        </fieldset>

        <FormSubmit
          label="Submit application"
          pendingLabel="Submitting…"
          isPending={isPending}
          error={errorMessage}
        />
      </form>
    </Card>
  );
}

interface InterestChoicesProps {
  register: UseFormRegister<VolunteerApplicationInputs>;
  error?: string;
}

function InterestChoices({ register, error }: InterestChoicesProps) {
  return (
    <fieldset aria-describedby={error ? "interest-error" : undefined} className="min-w-0 space-y-2">
      <legend className="text-foreground text-sm/6 font-semibold">
        Interested in{" "}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {VOLUNTEER_INTERESTS.map((interest) => (
          <label key={interest} className="relative block">
            <input
              type="radio"
              value={interest}
              className="peer sr-only"
              {...register("interest")}
            />
            <span className="border-input bg-background text-foreground hover:border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-focus-visible:outline-ring flex h-full min-h-12 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
              {interest}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id="interest-error" className="text-destructive mt-1 text-sm">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface StepHeadingProps {
  number: string;
  title: string;
}

function StepHeading({ number, title }: StepHeadingProps) {
  return (
    <div className="flex items-baseline gap-3 border-b pb-2">
      <span aria-hidden="true" className="font-eczar text-primary-ink text-3xl leading-none">
        {number}
      </span>
      <H3 className="text-xl">{title}</H3>
    </div>
  );
}

function TricolorBand() {
  return (
    <div aria-hidden="true" className="flex h-1.5">
      <span className="bg-primary flex-1" />
      <span className="bg-background flex-1" />
      <span className="bg-secondary flex-1" />
    </div>
  );
}

const getRevealProps = (index: number, shouldReduceMotion: boolean | null) =>
  shouldReduceMotion
    ? {}
    : ({
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
      } as const);
