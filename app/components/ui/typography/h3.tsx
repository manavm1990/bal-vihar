import { cn } from '@lib/utils'

import type TypographyProps from './typography.types'

export default function H3({ className, children }: TypographyProps) {
  return (
    <h3 className={cn('mt-2 scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  )
}
