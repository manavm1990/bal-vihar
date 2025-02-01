import { cn } from '@lib/utils'
import type TypographyProps from '../typography.types'

export default function P({ className, children }: TypographyProps) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
}
