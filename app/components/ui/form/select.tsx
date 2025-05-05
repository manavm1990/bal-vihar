'use client'

import { Label } from './label'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        id={id}
        className={`border-input text-foreground focus:ring-ring h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
