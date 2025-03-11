'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [{ href: '/privacy', label: 'Privacy Policy' }]

function filterLinks(currentPath: string) {
  return LINKS.filter((link) => link.href !== currentPath)
}

export default function Links() {
  const pathname = usePathname()

  return (
    <ul className="[&_a]:text-muted-foreground mt-4 flex flex-wrap gap-2 text-xs">
      {filterLinks(pathname).map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}
