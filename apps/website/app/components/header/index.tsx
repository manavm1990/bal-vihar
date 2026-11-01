import { BASE_TITLE, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import Image from "next/image";
import Link from "next/link";
import { DesktopNav, MobileNav } from "./navs";
import SearchMenu from "./search-menu.client";

export default function Header() {
  return (
    <header className="border-t-primary border-b-border relative flex items-center gap-x-6 border-t-8 border-b px-6 py-3 shadow-sm">
      <Link href="/" className="flex min-w-0 items-center gap-3 pr-24 sm:gap-4 xl:pr-0">
        <Image
          src="/logo.svg"
          alt=""
          width={180}
          height={173}
          priority
          className="size-20 shrink-0 sm:size-24 md:size-28"
        />
        <span className="font-display text-navy min-w-0 text-sm leading-snug font-semibold sm:text-base md:text-lg">
          <span className="sr-only">{BASE_TITLE} – </span>
          {ORGANIZATION_LEGAL_NAME}
        </span>
      </Link>

      <MobileNav />

      <DesktopNav />

      <SearchMenu />
    </header>
  );
}
