import { cn } from "@lib/utils";
import kebabCase from "lodash.kebabcase";
import type { ComponentProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import { Label as FormLabel } from "./label";

export const CONTROL_CLASS =
  "bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring aria-invalid:outline-destructive aria-invalid:focus:outline-destructive block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2";

interface FormFieldBase {
  label: string;
  name: string;
  className?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

// Input field specific props
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

// Textarea specific props
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

// Discriminated union
type FormFieldProps = InputFieldProps | TextareaFieldProps;

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
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
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

interface FormInputProps extends ComponentProps<"input"> {
  type?: "text" | "email" | "tel" | "date";
}

function FormInput({ type = "text", ...props }: FormInputProps) {
  return <input type={type} className={CONTROL_CLASS} {...props} />;
}

function FormTextArea({ rows = 4, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} className={CONTROL_CLASS} {...props} />;
}
