import { stegaClean } from "@sanity/client/stega";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface SmartLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

export default function SmartLink({ href, children, ...props }: SmartLinkProps) {
  const cleanHref = stegaClean(href);

  if (cleanHref.startsWith("#"))
    return (
      <a href={cleanHref} {...props}>
        {children}
      </a>
    );

  return cleanHref.startsWith("/") ? (
    <Link href={cleanHref} {...props}>
      {children}
    </Link>
  ) : (
    <a href={cleanHref} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
