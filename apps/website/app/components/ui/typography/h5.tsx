import { cn } from '@lib/utils'

import type TypographyProps from './typography.types'

export default function H5({ className, children }: TypographyProps) {
  return (
    <h5 className={cn('scroll-m-20 text-lg font-semibold tracking-tight', className)}>
      {children}
    </h5>
  )
}
