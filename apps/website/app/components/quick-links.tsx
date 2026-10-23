"use client";

import * as motion from "motion/react-client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface LinkItem {
  href: string;
  text: string;
  className?: string;
  /** Hidden in the mobile bottom bar; reachable from the main menu. */
  desktopOnly?: boolean;
}
const LINKS: LinkItem[] = [
  {
    href: "/",
    text: "Home 🏠",
    desktopOnly: true,
    className: "bg-primary/80 text-navy hover:bg-primary-600/80",
  },
  {
    href: "/new-families",
    text: "New Families",
    className: "bg-primary/80 text-navy hover:bg-primary-600/80",
  },
  {
    href: "/questions",
    text: "Questions?",
    className: "bg-secondary/80 text-white hover:bg-secondary-600/80",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const sortedLinks = [...LINKS].sort((a, b) => a.text.length - b.text.length);

export default function QuickLinks() {
  const pathname = usePathname();

  return (
    <motion.section
      className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-10 flex justify-center gap-3 border-t p-2 md:inset-x-auto md:right-0 md:bottom-4 md:mt-4 md:flex-col md:gap-4 md:border-t-0 md:bg-transparent md:p-0"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {sortedLinks.map((link, i) => {
        if (pathname === link.href) return null;

        const damping = 12 + i * 0.8;
        const stiffness = 100 - i * 5;

        const item = {
          hidden: { x: 100, opacity: 0 },
          show: {
            x: 0,
            opacity: 1,
            transition: {
              /**
               * * 'as const' lets TS know that it will be a specific
               * 'Motion' type 🏷️,
               * and not just a string.
               */
              type: "spring" as const,

              stiffness,
              damping,
              delay: 0.3 + i * 0.05,
            },
          },
        };

        return (
          <motion.div
            key={link.text}
            className={`${link.desktopOnly ? "hidden md:flex" : "flex"} justify-end ${i % 2 ? "md:hover:-rotate-3" : "md:hover:rotate-3"}`}
            variants={item}
          >
            <Link {...link} />
          </motion.div>
        );
      })}
    </motion.section>
  );
}

function Link({ href, text, className = "" }: LinkItem) {
  return (
    <NextLink
      href={href}
      className={`${className} rounded-md px-4 py-2 text-sm transition-transform hover:no-underline md:ml-auto md:rounded-none md:py-2 md:pr-4 md:pl-8 md:text-xs md:[clip-path:polygon(100%_4%,100%_96%,8%_100%,0_0)] md:hover:scale-110`}
    >
      {text}
    </NextLink>
  );
}
