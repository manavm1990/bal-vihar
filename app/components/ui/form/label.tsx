import type { LabelHTMLAttributes } from 'react'

export function Label({ htmlFor, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-foreground block text-sm/6 font-semibold" {...props}>
      {children}
    </label>
  )
}
