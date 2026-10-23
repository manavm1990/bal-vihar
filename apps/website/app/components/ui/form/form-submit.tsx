import { Button } from "../button";

interface FormSubmitProps {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  error?: string;
}

/**
 * Submit button that swaps its label while pending, with the form-level error announced below.
 *
 * @example
 * <FormSubmit label="Send message" pendingLabel="Sending…" isPending={isPending} error={errorMessage} />
 */
export function FormSubmit({ label, pendingLabel, isPending, error }: FormSubmitProps) {
  return (
    <div className="space-y-3">
      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? pendingLabel : label}
      </Button>
      {error && (
        <p role="alert" className="text-destructive text-sm font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
