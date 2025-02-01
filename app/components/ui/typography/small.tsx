import { cn } from '@lib/utils'
import type TypographyProps from './typography.types'

export default function Small({ className, children }: TypographyProps) {
  return <small className={cn('text-sm leading-none font-medium', className)}>{children}</small>
}
