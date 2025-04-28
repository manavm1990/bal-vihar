import { cn } from '@lib/utils'

import type { IconProps } from '../icons.types'

import { SVG_PROPS } from '../constants'

export default function Down({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}
