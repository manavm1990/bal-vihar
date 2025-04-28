import { cn } from '@lib/utils'

import type { IconProps } from '../icons.types'

import { SVG_PROPS } from '../constants'

export default function Left({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path d="M14 7l-5 5 5 5V7z" />
    </svg>
  )
}
