import { cn } from '@lib/utils'
import type TypographyProps from '../typography.types'

export default function LeadP({ className, children }: TypographyProps) {
  return <p className={cn('text-xl text-gray-600', className)}>{children}</p>
}
