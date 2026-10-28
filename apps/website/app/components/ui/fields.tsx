import { cn } from "@lib/utils";
import kebabCase from "lodash.kebabcase";
import type {
  ComponentProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "./button";

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export const CONTROL_CLASS =
  "bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring aria-invalid:outline-destructive aria-invalid:focus:outline-destructive block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2";

interface CheckboxProps {
  error?: string;
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  value?: string;
}

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

interface FormFieldBase {
  label: string;
  name: string;
  className?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

interface FormInputProps extends ComponentProps<"input"> {
  type?: "text" | "email" | "tel" | "date";
}

interface FormSubmitProps {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  error?: string;
}

interface InputFieldProps extends FormFieldBase {
  isTextArea?: false;
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "name" | "id" | "autoComplete" | "value" | "onChange" | "onBlur"
  >;
}

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: readonly { value: string; label: string }[];
}

interface TextareaFieldProps extends FormFieldBase {
  isTextArea: true;
  rows?: number;
  value?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "id" | "rows" | "value" | "onChange" | "onBlur"
  >;
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

/**
 * Labelled text input or textarea. Forwards `ref`, `onChange` and `onBlur`, so it can be
 * spread directly from React Hook Form's `register`.
 *
 * @example
 * <FormField label="Email" type="email" required {...register("email")} error={errors.email?.message} />
 */
export function FormField(props: FormFieldProps) {
  const { label, name, className, error, required } = props;
  const id = kebabCase(name);
  const errorId = `${id}-error`;
  const a11yProps = {
    "aria-invalid": error ? true : undefined,
    "aria-required": required ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  } as const;

  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {props.isTextArea ? (
        <FormTextArea
          name={name}
          id={id}
          rows={props.rows}
          ref={props.ref}
          onBlur={props.onBlur}
          onChange={props.onChange}
          placeholder={props.placeholder}
          {...a11yProps}
          {...props.textareaProps}
          defaultValue={props.value ?? ""}
        />
      ) : (
        <FormInput
          type={props.type ?? "text"}
          name={name}
          id={id}
          ref={props.ref}
          autoComplete={props.autoComplete}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          placeholder={props.placeholder}
          {...a11yProps}
          {...props.inputProps}
        />
      )}
      {error && (
        <p id={errorId} className="text-destructive mt-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
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

/**
 * Form control label with an optional, screen-reader-hidden required marker.
 *
 * @example
 * <Label htmlFor="search-query" required>Search</Label>
 */
export function Label({ htmlFor, required, children, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-foreground block text-sm/6 font-semibold" {...props}>
      {children}
      {required && (
        <span aria-hidden="true" className="text-destructive">
          {" "}
          *
        </span>
      )}
    </label>
  );
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

function FormInput({ type = "text", ...props }: FormInputProps) {
  return <input type={type} className={CONTROL_CLASS} {...props} />;
}

function FormTextArea({ rows = 4, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} className={CONTROL_CLASS} {...props} />;
}
