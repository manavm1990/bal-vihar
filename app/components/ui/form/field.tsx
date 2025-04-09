import kebabCase from 'lodash.kebabcase'
import {
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

// Base interface with common properties
interface FormFieldBase {
  label: string
  name: string
  className?: string
  error?: string
}

// Input field specific props
interface InputFieldProps extends FormFieldBase {
  isTextArea?: false
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  value?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'name' | 'id' | 'autoComplete' | 'value' | 'onChange'
  >
}

// Textarea specific props
interface TextareaFieldProps extends FormFieldBase {
  isTextArea: true
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'id' | 'rows' | 'value' | 'onChange'
  >
}

// Discriminated union
type FormFieldProps = InputFieldProps | TextareaFieldProps

export function FormField(props: FormFieldProps) {
  const { label, name, className, error } = props
  const id = kebabCase(name)

  return (
    <div className={className}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {props.isTextArea ? (
        <FormTextArea
          name={name}
          id={id}
          rows={props.rows}
          onChange={props.onChange}
          {...props.textareaProps}
          defaultValue={props.value ?? ''}
        />
      ) : (
        <FormInput
          type={props.type ?? 'text'}
          name={name}
          id={id}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={props.onChange}
          {...props.inputProps}
        />
      )}
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  )
}

function FormLabel({ htmlFor, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-foreground block text-sm/6 font-semibold" {...props}>
      {children}
    </label>
  )
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'tel'
}

function FormInput({ type = 'text', name, id, autoComplete, ...props }: FormInputProps) {
  return (
    <div className="mt-2.5">
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
        {...props}
      />
    </div>
  )
}

function FormTextArea({
  name,
  id,
  rows = 4,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="mt-2.5">
      <textarea
        name={name}
        id={id}
        rows={rows}
        className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
        {...props}
      />
    </div>
  )
}
