"use client";

import { Checkbox } from "@components/ui/form/checkbox";
import { FormField } from "@components/ui/form/field";
import { FormSubmit } from "@components/ui/form/form-submit";
import { FormSuccess } from "@components/ui/form/form-success.client";
import { P } from "@components/ui/typography";

import useDisclaimer from "./use-disclaimer";

export default function DisclaimerForm() {
  const { register, errors, onSubmit, isPending, successMessage, errorMessage } = useDisclaimer();

  if (successMessage) return <FormSuccess title="Disclaimer submitted" message={successMessage} />;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isPending} className="space-y-6">
      <fieldset
        disabled={isPending}
        className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        <legend className="sr-only">Disclaimer form</legend>
        <FormField
          label="Parent(s) name"
          autoComplete="name"
          required
          className="sm:col-span-2"
          {...register("parentsName")}
          error={errors.parentsName?.message}
        />
        <FormField
          label="Full address"
          isTextArea
          rows={3}
          required
          className="sm:col-span-2"
          {...register("address")}
          error={errors.address?.message}
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
          label="Date"
          type="date"
          required
          {...register("signedDate")}
          error={errors.signedDate?.message}
        />
        <FormField
          label="Child(ren) name"
          isTextArea
          rows={3}
          required
          className="sm:col-span-2"
          {...register("childrenNames")}
          error={errors.childrenNames?.message}
        />
        <P className="text-muted-foreground sm:col-span-2 text-sm">
          Parents are held responsible for the safety of participants and will promote safety of
          others too.
        </P>
        <FormField
          label="Print parent/guardian name"
          autoComplete="name"
          required
          className="sm:col-span-2"
          {...register("parentGuardianName")}
          error={errors.parentGuardianName?.message}
        />
        <div className="sm:col-span-2">
          <Checkbox
            id="agreed"
            label="I/we have read and agree to the disclaimer above."
            registration={register("agreed")}
            error={errors.agreed?.message}
          />
        </div>
      </fieldset>
      <FormSubmit
        label="Submit disclaimer"
        pendingLabel="Submitting…"
        isPending={isPending}
        error={errorMessage}
      />
    </form>
  );
}
