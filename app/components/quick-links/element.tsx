'use client'

import { usePathname } from 'next/navigation'

interface QuickLinkElementProps {
  children: Readonly<React.ReactNode>
  href: string
}

export default function QuickLinkElement({ children, href }: QuickLinkElementProps) {
  const pathname = usePathname()

  return pathname === href ? null : children
}
