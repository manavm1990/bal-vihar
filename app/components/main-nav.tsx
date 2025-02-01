'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithoutRef } from 'react'

type LinkProps = {
  href: string
} & Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> &
  Omit<NavigationMenu.NavigationMenuLinkProps, 'asChild' | 'active'>

interface NavigationItem {
  name: string
  link: string
  items: NavigationSubItem[]
}

interface NavigationSubItem {
  name: string
  link: string
}

const NAVIGATION = [
  {
    name: 'About Us',
    link: '/about-us',
    items: [
      { name: 'History', link: '/about-us/history' },
      { name: "President's Message", link: '/about-us/presidents-message' },
      { name: 'Advisory Board', link: '/about-us/advisory-board' },
      { name: 'Administrative Team', link: '/about-us/administrative-team' },
      { name: 'Policies & Procedures', link: '/about-us/policies-and-procedures' },
      { name: 'Community Outreach', link: '/about-us/community-outreach' },
    ],
  },
  {
    name: 'Admissions',
    link: '/admissions',
    items: [
      { name: 'Admission Process', link: '/admissions/admission-process' },
      { name: 'Tuition', link: '/admissions/tuition' },
      { name: 'Refund Policy', link: '/admissions/refund-policy' },
    ],
  },
  {
    name: 'Education',
    link: '/education',
    items: [
      { name: 'Curriculum  (K - 7)', link: '/education/curriculum-k-7' },
      { name: 'Curriculum - Youth Group', link: '/education/curriculum-youth-group' },
      { name: 'Education Policy', link: '/education/education-policy' },
      { name: 'Class Webpages', link: '/education/class-webpages' },
      { name: 'Class Schedule', link: '/education/class-schedule' },
      { name: 'Facility', link: '/education/facility' },
    ],
  },
  {
    name: 'News & Events',
    link: '/news-and-events',
    items: [
      { name: 'Bal Vihar in News', link: '/news-and-events/bal-vihar-in-news' },
      { name: 'Upcoming Classes/Events', link: '/news-and-events/upcoming-classes-events' },
    ],
  },
  {
    name: 'Resources',
    link: '/resources',
    items: [
      { name: 'Parents Resources', link: '/resources/parents-resources' },
      { name: 'Student Resources', link: '/resources/student-resources' },
      { name: 'Faculty Resources', link: '/resources/faculty-resources' },
      { name: 'Admin Resources', link: '/resources/admin-resources' },
    ],
  },
  {
    name: 'Giving',
    link: '/giving',
    items: [
      { name: 'Welcome Message', link: '/giving/welcome-message' },
      { name: 'Give Online', link: '/giving/give-online' },
      { name: 'Make a Gift', link: '/giving/make-a-gift' },
      { name: 'Matching Gift Program', link: '/giving/matching-gift-program' },
      { name: 'Matching Gift Companies', link: '/giving/matching-gift-companies' },
      { name: 'Event Sponsors', link: '/giving/event-sponsors' },
    ],
  },
  {
    name: 'Volunteering',
    link: '/volunteering',
    items: [
      { name: 'Why Volunteer?', link: '/volunteering/why-volunteer' },
      { name: 'Volunteer Opportunities', link: '/volunteering/volunteer-opportunities' },
      { name: 'Volunteer Application', link: '/volunteering/volunteer-application' },
      { name: 'Volunteer Policies', link: '/volunteering/volunteer-policies' },
      { name: 'Volunteers List', link: '/volunteering/volunteers-list' },
    ],
  },
  {
    name: 'Community Projects',
    link: '/community-projects',
    items: [
      { name: 'CANstruction', link: '/community-projects/canstruction' },
      { name: 'Clothes Drive', link: '/community-projects/clothes-drive' },
      { name: 'Independence Day', link: '/community-projects/independence-day' },
      { name: 'International Yoga Day', link: '/community-projects/international-yoga-day' },
      { name: 'Walk for Water', link: '/community-projects/walk-for-water' },
    ],
  },
] as const satisfies readonly NavigationItem[]

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
    <nav>
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex items-center gap-4">
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
