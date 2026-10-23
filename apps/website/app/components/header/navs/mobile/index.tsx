"use client";

import { ChevronDownIcon, Cross1Icon as CrossIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { groupItems, NAVIGATION } from "../constants";
import useMobile from "./use-mobile";

const ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
} as const;

const MENU_VARIANTS = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
} as const;

const SUB_ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
} as const;

export default function MobileNav() {
  const { isOpen, setIsOpen, activeSection, setActiveSection, containerRef } = useMobile();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="text-navy-600 hover:text-primary-ink absolute top-2 right-2 p-2 xl:hidden"
      >
        {isOpen ? <CrossIcon className="h-6 w-6" /> : <HamburgerMenuIcon className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 xl:hidden"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={MENU_VARIANTS}
        className="fixed top-0 right-0 bottom-0 z-10 w-full max-w-xs overflow-y-auto bg-white shadow-lg xl:hidden"
      >
        <div className="flex justify-end border-b p-4">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-navy-600 hover:text-primary-ink p-2"
          >
            <CrossIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <motion.ul className="space-y-2" variants={ITEM_VARIANTS}>
            {NAVIGATION.map((section) => (
              <motion.li key={section.name} variants={ITEM_VARIANTS}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection(activeSection === section.name ? null : section.name);
                  }}
                  className={`flex w-full items-center justify-between p-2 text-left font-medium ${
                    activeSection === section.name
                      ? "text-primary-ink bg-primary-50"
                      : "text-navy-700 hover:text-primary-ink"
                  }`}
                >
                  <span>{section.name}</span>
                  <ChevronDownIcon
                    className={`text-navy-400 h-4 w-4 transition-transform ${
                      activeSection === section.name
                        ? "text-primary-700 rotate-180"
                        : "group-hover:text-primary-700"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeSection === section.name && (
                    <motion.ul
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={ITEM_VARIANTS}
                      className="ml-4 overflow-hidden"
                    >
                      {groupItems(section.items).flatMap((group) => [
                        ...(group.heading
                          ? [
                              <motion.li
                                key={`heading-${group.heading}`}
                                variants={SUB_ITEM_VARIANTS}
                              >
                                <p className="text-muted-foreground px-2 pt-3 pb-1 text-xs font-semibold tracking-wide uppercase">
                                  {group.heading}
                                </p>
                              </motion.li>,
                            ]
                          : []),
                        ...group.items.map((item) => (
                          <motion.li key={item.link} variants={SUB_ITEM_VARIANTS}>
                            <Link
                              href={item.link}
                              className="text-navy-600 hover:text-primary-ink block p-2 text-sm"
                            >
                              {item.name}
                            </Link>
                          </motion.li>
                        )),
                      ])}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.div>
    </>
  );
}
