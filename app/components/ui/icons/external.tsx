import { cn } from '@lib/utils'

import type { IconProps } from './icons.types'

import { SVG_PROPS } from './constants'

export default function External({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn('inline-block size-6', className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  )
}
