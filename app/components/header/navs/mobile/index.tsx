'use client'

import { ChevronDownIcon, HamburgerMenuIcon, Cross1Icon as XIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { NAVIGATION } from '../constants'
import useMobile from './use-mobile'

const MENU_VARIANTS = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
} as const

const ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
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
} as const

const SUB_ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
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
} as const

export default function MobileNav() {
  const { isOpen, setIsOpen, activeSection, setActiveSection, containerRef } = useMobile()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 left-2 p-2 text-gray-600 hover:text-gray-900 lg:hidden"
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <HamburgerMenuIcon className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={MENU_VARIANTS}
        className="fixed top-0 bottom-0 left-0 z-10 w-full max-w-xs overflow-y-auto bg-white shadow-lg lg:hidden"
      >
        <div className="border-b p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <motion.ul className="space-y-2" variants={ITEM_VARIANTS}>
            {NAVIGATION.map((section) => (
              <motion.li key={section.name} variants={ITEM_VARIANTS}>
                <button
                  onClick={() =>
                    setActiveSection(activeSection === section.name ? null : section.name)
                  }
                  className="flex w-full items-center justify-between p-2 text-left text-gray-600 hover:text-gray-900"
                >
                  <span>{section.name}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      activeSection === section.name ? 'rotate-180' : ''
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
                      {section.items.map((item) => (
                        <motion.li key={item.name} variants={SUB_ITEM_VARIANTS}>
                          <Link
                            href={item.link}
                            className="block p-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.div>
    </>
  )
}
