import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { DesktopNav, MobileNav } from "./navs";

export default function Header() {
  return (
    <header className="border-t-primary border-b-border relative flex items-center gap-x-6 border-t-8 border-b px-6 py-3 shadow-sm">
      <Link href="/" className="shrink-0">
        <Image
          src="/logo.svg"
          alt="Bal Vihar Logo"
          width={180}
          height={173}
          priority
          className="size-20 sm:size-24 md:size-28"
        />
      </Link>

      <MobileNav />

      <DesktopNav />

      <Link
        href="/search"
        className="text-navy-600 hover:text-primary-ink hover:bg-accent absolute top-2 right-14 flex items-center gap-1.5 rounded-lg p-2 text-base xl:static xl:px-3"
      >
        <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6 xl:h-5 xl:w-5" />
        <span className="sr-only xl:not-sr-only">Search</span>
      </Link>
    </header>
  );
}
