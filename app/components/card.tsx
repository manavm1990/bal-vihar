import { cn } from '../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        'container mx-auto flex max-w-prose flex-col gap-4 rounded-lg border-l-4 border-l-[var(--color-primary)] bg-[var(--color-muted)] px-4 py-4',
        className,
      )}
    >
      {children}
    </section>
  )
}
