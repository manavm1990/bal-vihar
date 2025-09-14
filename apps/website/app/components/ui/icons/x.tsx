import { cn } from '@lib/utils'

import type { IconProps } from './icons.types'

import { SVG_PROPS } from './constants'

export default function X({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}
