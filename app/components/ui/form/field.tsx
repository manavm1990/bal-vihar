interface FormFieldProps {
  label: string
  type?: 'text' | 'email' | 'tel'
  name: string
  autoComplete?: string
  isTextArea?: boolean
  rows?: number
  className?: string
}

export function FormField({
  label,
  type = 'text',
  name,
  autoComplete,
  isTextArea,
  rows,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {isTextArea ? (
        <FormTextArea name={name} id={name} rows={rows} />
      ) : (
        <FormInput type={type} name={name} id={name} autoComplete={autoComplete} />
      )}
    </div>
  )
}

interface FormLabelProps {
  htmlFor: string
  children: React.ReactNode
}

function FormLabel({ htmlFor, children }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-foreground block text-sm/6 font-semibold">
      {children}
    </label>
  )
}

interface FormInputProps {
  type?: 'text' | 'email' | 'tel'
  name: string
  id: string
  autoComplete?: string
}

function FormInput({ type = 'text', name, id, autoComplete }: FormInputProps) {
  return (
    <div className="mt-2.5">
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
      />
    </div>
  )
}

interface FormTextAreaProps {
  name: string
  id: string
  rows?: number
}

function FormTextArea({ name, id, rows = 4 }: FormTextAreaProps) {
  return (
    <div className="mt-2.5">
      <textarea
        name={name}
        id={id}
        rows={rows}
        className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
        defaultValue=""
      />
    </div>
  )
}
