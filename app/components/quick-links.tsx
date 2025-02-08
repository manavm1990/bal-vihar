import * as motion from 'motion/react-client'
import NextLink from 'next/link'

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
    className: 'bg-primary/80',
  },
  {
    type: 'internal',
    href: '/sponsors',
    text: 'Sponsor',
    className: 'bg-foreground/80 text-white',
  },
  {
    type: 'internal',
    href: '/questions',
    text: 'Questions?',
    className: 'bg-tertiary/80 text-white',
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
      {LINKS.map((link) => (
        <motion.div key={link.text} className="flex justify-end" variants={item}>
          <Link {...link} />
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
      className={`${className} ml-auto py-2 pr-4 pl-8 text-xs [clip-path:polygon(0_0%,100%_0%,100%_100%,8%_100%)]`}
      {...componentProps}
    >
      {text}
    </Component>
  )
}
