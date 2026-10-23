import { cn } from "@lib/utils";
import kebabCase from "lodash.kebabcase";

import { CONTROL_CLASS } from "./field";
import { Label } from "./label";

interface FileFieldProps {
  label: string;
  name: string;
  accept: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: () => void;
  onChange?: (file: File | undefined) => void;
}

/**
 * Labelled single-file input. Reports the chosen `File` (not a `FileList`), so it pairs with React
 * Hook Form's `Controller` and a Valibot `file()` schema.
 *
 * @example
 * <FileField label="Receipt" name="receipt" accept="image/jpeg,application/pdf" required onChange={field.onChange} />
 */
export function FileField({
  label,
  name,
  accept,
  hint,
  error,
  required,
  className,
  ref,
  onBlur,
  onChange,
}: FileFieldProps) {
  const id = kebabCase(name);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        ref={ref}
        onBlur={onBlur}
        onChange={(event) => {
          onChange?.(event.target.files?.[0]);
        }}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          CONTROL_CLASS,
          "file:bg-secondary file:text-secondary-foreground file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-medium",
        )}
      />
      {hint && (
        <p id={hintId} className="text-muted-foreground text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-destructive mt-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
