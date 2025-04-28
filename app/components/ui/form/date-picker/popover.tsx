'use client'

import { cn } from '@lib/utils'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-none data-[side=bottom]:[animation:var(--animate-slide-down)] data-[side=left]:[animation:var(--animate-enter-from-left)] data-[side=right]:[animation:var(--animate-enter-from-right)] data-[side=top]:[animation:var(--animate-slide-up)] data-[state=closed]:[animation:var(--animate-scale-out)] data-[state=open]:[animation:var(--animate-scale-in)]',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
