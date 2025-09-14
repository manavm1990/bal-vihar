'use client'

import { cn } from '@lib/utils'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-border shrink-0',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
