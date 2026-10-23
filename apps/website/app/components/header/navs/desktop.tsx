"use client";

import { cn } from "@lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { groupItems, NAVIGATION, type NavigationSubItem } from "./constants";

type LinkProps = {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof NextLink>, "href"> &
  Omit<NavigationMenu.NavigationMenuLinkProps, "asChild" | "active">;

function Link({ href, ...props }: LinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <NextLink
        href={href}
        className={`hover:bg-accent block rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive ? "text-primary-ink font-medium" : "text-navy-600 hover:text-primary-ink"
        }`}
        {...props}
      />
    </NavigationMenu.Link>
  );
}

export default function DesktopNav() {
  return (
    <nav className="ml-auto hidden xl:block xl:pr-4">
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex items-center">
          {NAVIGATION.map((item) => (
            <NavigationMenu.Item key={item.name} className="relative">
              {!item.items ? (
                <NavigationMenu.Link asChild>
                  <NextLink
                    href={item.link}
                    className="text-navy-700 hover:text-primary-ink flex items-center px-3 py-4 text-sm font-medium whitespace-nowrap hover:no-underline"
                  >
                    {item.name}
                  </NextLink>
                </NavigationMenu.Link>
              ) : (
                <>
                  <NavigationMenu.Trigger className="group text-navy-700 hover:text-primary-ink data-[state=open]:text-primary-ink flex items-center gap-1 px-3 py-4 text-sm font-medium whitespace-nowrap">
                    {item.name}
                    <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={cn(
                      "data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-full z-10 rounded-lg bg-white",
                      item.align === "right" ? "right-0" : "left-1/2 -translate-x-1/2",
                    )}
                  >
                    <SubMenu items={item.items} />
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  );
}

interface SubMenuProps {
  items: readonly NavigationSubItem[];
  defaultValue?: string;
}

function SubMenu({ items, defaultValue = "overview" }: SubMenuProps) {
  return (
    <NavigationMenu.Sub defaultValue={defaultValue}>
      <NavigationMenu.List className="flex min-w-max gap-x-8 rounded-lg p-4 shadow">
        {groupItems(items).map((group) => (
          <NavigationMenu.Item key={group.heading ?? "links"} className="min-w-48">
            {group.heading && (
              <p className="text-muted-foreground px-3 pt-2 pb-1 text-xs font-semibold tracking-wide uppercase">
                {group.heading}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.link}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Sub>
  );
}
