import { cn } from '@lib/utils'

import type { IconProps } from './icons.types'

import { SVG_PROPS } from './constants'

export default function ThreeBars({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}
