import type TypographyProps from './typography.types'
import { cn } from '@lib/utils'

export default function H2({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  )
}
