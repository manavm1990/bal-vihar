"use client";

import { cn } from "@lib/utils";

import { CONTROL_CLASS } from "./field";
import { Label } from "./label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

/**
 * Labelled native select. Native keeps the picker accessible and mobile friendly, and `ref`
 * is forwarded so it can be spread from React Hook Form's `register`.
 *
 * @example
 * <Select id="interest" label="Interested in" options={OPTIONS} {...register("interest")} />
 */
export function Select({ label, error, options, className, id, required, ...props }: SelectProps) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <select
        id={id}
        className={cn(CONTROL_CLASS, "disabled:cursor-not-allowed disabled:opacity-50", className)}
        aria-invalid={error ? true : undefined}
        aria-required={required ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-destructive mt-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
