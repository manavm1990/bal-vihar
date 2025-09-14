import { cn } from '@lib/utils'

import type TypographyProps from '../typography.types'

export default function P({ className, children }: TypographyProps) {
  return <p className={cn('max-w-prose leading-6', className)}>{children}</p>
}
