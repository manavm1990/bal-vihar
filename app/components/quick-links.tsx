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
    className: 'bg-primary/85',
  },
  {
    type: 'internal',
    href: '/sponsors',
    text: 'Sponsor',
    className: 'bg-foreground/95 text-white',
  },
  {
    type: 'internal',
    href: '/contact-us',
    text: 'Contact Us',
    className: 'bg-tertiary/85 text-white',
  },
] as const

export default function QuickLinks() {
  return (
    <section className="fixed right-0 z-10 mt-4 flex flex-col gap-y-4">
      {LINKS.map((link) => (
        <Link key={link.text} {...link} />
      ))}
    </section>
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
