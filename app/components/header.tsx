import Image from 'next/image'
import MainNav from './main-nav'

export default function Header() {
  return (
    <header className="flex items-center gap-x-4 p-4 shadow-lg">
      <Image src="/logo.svg" alt="Bal Vihar Logo" width={180} height={173} priority />
      <MainNav />
    </header>
  )
}
