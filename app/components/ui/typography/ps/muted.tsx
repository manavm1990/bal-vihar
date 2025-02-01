import { cn } from '@lib/utils'
import type TypographyProps from '../typography.types'

export default function MutedP({ className, children }: TypographyProps) {
  return <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
}
