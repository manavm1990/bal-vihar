import PagePhoto from "./page-photo";
import type { TextColumnsProps } from "./text-columns";

import TextColumns from "./text-columns";
import { H1 } from "./ui/typography";

interface ArticleProps extends TextColumnsProps {
  title: string;
  photoPath?: string;
}

export default function Article({ title, photoPath, children, className }: ArticleProps) {
  return (
    <article className="space-y-4">
      <H1>{title}</H1>
      <PagePhoto path={photoPath} />
      <TextColumns className={className}>{children}</TextColumns>
    </article>
  );
}
