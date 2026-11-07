"use client";

import { FormField, FormSubmit } from "@components/ui/fields";
import { FormSuccess } from "@components/ui/form-success.client";
import useContact from "./use-contact";

export default function ContactForm() {
  const { register, errors, onSubmit, isPending, successMessage, errorMessage } = useContact();

  if (successMessage) return <FormSuccess title="Thank you!" message={successMessage} />;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-6">
      <fieldset
        disabled={isPending}
        className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        <legend className="sr-only">Contact us</legend>
        <FormField
          label="First name"
          autoComplete="given-name"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <FormField
          label="Last name"
          autoComplete="family-name"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <FormField
          label="Email"
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
          label="Message"
          isTextArea
          rows={4}
          required
          className="sm:col-span-2"
          {...register("message")}
          error={errors.message?.message}
        />
      </fieldset>
      <FormSubmit
        label="Send message"
        pendingLabel="Sending…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}
