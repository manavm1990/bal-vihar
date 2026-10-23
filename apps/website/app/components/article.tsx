import PagePhoto from "./page-photo";
import type { TextColumnsProps } from "./text-columns";

import TextColumns from "./text-columns";
import { H1, LeadP } from "./ui/typography";

interface ArticleProps extends TextColumnsProps {
  title: string;
  subtitle?: string;
  photoPath?: string;
}

export default function Article({ title, subtitle, photoPath, children, className }: ArticleProps) {
  return (
    <article className="space-y-4">
      <H1>{title}</H1>
      {subtitle && <LeadP>{subtitle}</LeadP>}
      <PagePhoto path={photoPath} />
      <TextColumns className={className}>{children}</TextColumns>
    </article>
  );
}
