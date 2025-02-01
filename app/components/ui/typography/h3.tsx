import type TypographyProps from './typography.types'
import { cn } from '@lib/utils'

export default function H3({ className, children }: TypographyProps) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  )
}
