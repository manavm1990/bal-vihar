import type { TextColumnsProps } from './text-columns'

import TextColumns from './text-columns'
import { H2 } from './ui/typography'

interface ArticleProps extends TextColumnsProps {
  title: string
}

export default function Article({ title, children, className }: ArticleProps) {
  return (
    <article className="space-y-4">
      <H2>{title}</H2>
      <TextColumns className={className}>{children}</TextColumns>
    </article>
  )
}
