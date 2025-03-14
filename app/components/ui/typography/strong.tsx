import { cn } from '@lib/utils'
import type TypographyProps from './typography.types'

export default function Strong({ className, children }: TypographyProps) {
  return <strong className={cn('my-3 text-lg font-semibold', className)}>{children}</strong>
}
