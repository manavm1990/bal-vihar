import Image from 'next/image'
import { DesktopNav, MobileNav } from './navs'

export default function Header() {
  return (
    <header className="relative flex items-center gap-x-6 p-6 shadow-lg">
      <Image
        src="/logo.svg"
        alt="Bal Vihar Logo"
        width={180}
        height={173}
        priority
        className="size-24 sm:size-32 md:size-40"
      />
      <DesktopNav />

      <MobileNav />
    </header>
  )
}
