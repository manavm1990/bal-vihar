import { cn } from '../lib/utils'
import { H2 } from './ui/typography'

interface ArticleProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function Article({ title, children, className }: ArticleProps) {
  return (
    <article className="space-y-4">
      <H2>{title}</H2>
      <div
        className={cn(
          'columns-1 space-y-6 py-4 md:columns-2 md:gap-x-12 [&_p]:mt-2 [&_p]:text-pretty',
          className,
        )}
      >
        {children}
      </div>
    </article>
  )
}
