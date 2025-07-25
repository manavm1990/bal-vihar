import { cn } from '@lib/utils'

import type TypographyProps from './typography.types'

export default function H2({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-wider first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  )
}
