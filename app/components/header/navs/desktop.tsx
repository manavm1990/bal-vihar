'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithoutRef } from 'react'
import { NAVIGATION } from './constants'

type LinkProps = {
  href: string
} & Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> &
  Omit<NavigationMenu.NavigationMenuLinkProps, 'asChild' | 'active'>

function Link({ href, ...props }: LinkProps) {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <NextLink
        href={href}
        className={`block rounded-lg p-3 text-sm transition-colors ${
          isActive ? 'text-primary-600 font-medium' : 'text-navy-600 hover:text-primary-500'
        }`}
        {...props}
      />
    </NavigationMenu.Link>
  )
}

export default function DesktopNav() {
  return (
    <nav className="hidden xl:block">
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex items-center">
          {NAVIGATION.map((item) => (
            <NavigationMenu.Item key={item.name} className="relative">
              <NavigationMenu.Trigger className="group text-navy-700 hover:text-primary-600 data-[state=open]:text-primary-600 flex items-center gap-1 p-4 font-medium">
                {item.name}
                <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-fight data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-full left-1/2 z-10 -translate-x-1/2 rounded-lg bg-white">
                <SubMenu items={item.items} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  )
}

interface SubMenuProps {
  items: readonly {
    readonly name: string
    readonly link: string
  }[]
  defaultValue?: string
}

function SubMenu({ items, defaultValue = 'overview' }: SubMenuProps) {
  return (
    <NavigationMenu.Sub defaultValue={defaultValue}>
      <NavigationMenu.List className="grid min-w-max grid-cols-2 gap-x-4 gap-y-1 shadow">
        {items.map((item) => (
          <NavigationMenu.Item key={item.name}>
            <Link href={item.link} className="block rounded-lg p-3 text-sm hover:bg-blue-50">
              {item.name}
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Sub>
  )
}
