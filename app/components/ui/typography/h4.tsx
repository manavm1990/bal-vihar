import type TypographyProps from './typography.types'
import { cn } from '@lib/utils'

export default function H4({ className, children }: TypographyProps) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  )
}
