import { cn } from '@lib/utils'
import type TypographyProps from './typography.types'

export default function BQ({ className, children }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>{children}</blockquote>
  )
}
