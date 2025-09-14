import { cn } from '@lib/utils'

import type TypographyProps from './typography.types'

export default function BQ({ className, children }: TypographyProps) {
  return (
    <blockquote className={cn('mt-4 border-l-2 pl-4 italic', className)}>{children}</blockquote>
  )
}
