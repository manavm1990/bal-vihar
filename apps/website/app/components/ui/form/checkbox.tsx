import type { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps {
  error?: string;
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  value?: string;
}

/**
 * Labelled checkbox for React Hook Form's `register`. Pass `value` for multi-select arrays.
 *
 * @example
 * <Checkbox
 *   id="agreed"
 *   label="I agree to the terms above."
 *   registration={register("agreed")}
 *   error={errors.agreed?.message}
 * />
 */
export function Checkbox({ error, id, label, registration, value }: CheckboxProps) {
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
