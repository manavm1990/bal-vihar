import Image from 'next/image'
import { DesktopNav, MobileNav } from './navs'

export default function Header() {
  return (
    <header className="relative flex items-center justify-center gap-x-4 p-4 shadow-lg">
      <Image src="/logo.svg" alt="Bal Vihar Logo" width={180} height={173} priority />
      <DesktopNav />

      <MobileNav />
    </header>
  )
}
