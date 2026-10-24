import type { StaticPageContent } from "@lib/static-page-content";
import Article from "./article";
import MarkdownContent from "./markdown-content";

interface StaticContentPageProps {
  page: StaticPageContent;
  photoPath?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}

export default function StaticContentPage({
  page,
  photoPath,
  intro,
  children,
}: StaticContentPageProps) {
  return (
    <Article
      title={page.title}
      subtitle={page.subtitle}
      photoPath={photoPath}
      intro={intro}
      className={page.singleColumn ? "md:columns-1" : undefined}
    >
      <MarkdownContent content={page.content} images={page.images} />
      {children}
    </Article>
  );
}
