import * as motion from 'motion/react-client'
import NextLink from 'next/link'
import { ExternalIcon } from '../ui/icons'
import QuickLinkElement from './element'

interface Link {
  type: 'internal' | 'external'
  href: string
  text: string
  className?: string
}

const LINKS: Link[] = [
  {
    type: 'external',
    href: 'https://www.paypal.com/donate?token=KqgZfvm9eCAmtzt-y3rla1Ahp-At4bwhJtvmxmnKSfs3xVsO5MCT8286Mkyi0TVh0yr8b69IdBcYk_6-&locale.x=US',
    text: 'Donate',
    className: 'bg-primary/80 text-navy hover:bg-primary-600/80',
  },
  {
    type: 'internal',
    href: '/sponsors',
    text: 'Sponsor',
    className: 'bg-navy/80 text-white hover:bg-navy-600/80',
  },
  {
    type: 'internal',
    href: '/questions',
    text: 'Questions?',
    className: 'bg-secondary/80 text-white hover:bg-secondary-600/80',
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function QuickLinks() {
  return (
    <motion.section
      className="fixed right-0 bottom-4 z-10 mt-4 flex flex-col gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* TODO: Hide 💩 if we are already on the 📃 page. */}
      {LINKS.map((link, i) => (
        <motion.div
          key={link.text}
          className={`flex justify-end ${i % 2 ? 'hover:-rotate-3' : 'hover:rotate-3'}`}
          variants={item}
        >
          <QuickLinkElement href={link.href}>
            <Link {...link} />
          </QuickLinkElement>
        </motion.div>
      ))}
    </motion.section>
  )
}

function Link({ type, href, text, className }: Link) {
  const Component = type === 'internal' ? NextLink : 'a'
  const componentProps = type === 'internal' ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Component
      href={href}
      className={`${className} ml-auto py-2 pr-4 pl-8 text-xs transition-transform [clip-path:polygon(100%_4%,100%_96%,8%_100%,0_0)] hover:scale-110 hover:no-underline`}
      {...componentProps}
    >
      {text}
      {type === 'external' && <ExternalIcon className="relative bottom-1 left-0.5 size-2" />}
    </Component>
  )
}
