import { cn } from '@lib/utils'
import type TypographyProps from './typography.types'

export default function Strong({ className, children }: TypographyProps) {
  return <strong className={cn('text-lg font-semibold', className)}>{children}</strong>
}
