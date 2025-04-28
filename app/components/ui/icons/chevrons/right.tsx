import { cn } from '@lib/utils'

import type { IconProps } from '../icons.types'

import { SVG_PROPS } from '../constants'

export default function Right({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}
