import Image from "next/image";
import Link from "next/link";

import { DesktopNav, MobileNav } from "./navs";
import SearchMenu from "./search-menu.client";

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

      <SearchMenu />
    </header>
  );
}
