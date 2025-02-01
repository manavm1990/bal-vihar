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
      <NextLink href={href} className="NavigationMenuLink" {...props} />
    </NavigationMenu.Link>
  )
}

export default function MainNav() {
  return (
    <nav className="hidden xl:block">
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex items-center">
          {NAVIGATION.map((item) => (
            <NavigationMenu.Item key={item.name} className="relative">
              <NavigationMenu.Trigger className="group flex items-center gap-1 p-4 text-sm font-medium">
                {item.name}
                <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-full left-1/2 -translate-x-1/2 bg-white">
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
