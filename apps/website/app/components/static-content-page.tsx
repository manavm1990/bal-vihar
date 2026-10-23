import type { StaticPageContent, StaticPageLink } from "@lib/static-page-content";
import Link from "next/link";
import Article from "./article";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Em, H2, H3, H4, Ol, P, Strong, Table, Ul } from "./ui/typography";

type MarkdownBlock =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "ordered-list"; start: number; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

interface StaticContentPageProps {
  page: StaticPageContent;
  photoPath?: string;
  children?: React.ReactNode;
}

export default function StaticContentPage({ page, photoPath, children }: StaticContentPageProps) {
  return (
    <Article
      title={page.title}
      photoPath={photoPath}
      className={page.singleColumn ? "md:columns-1" : undefined}
    >
      <MarkdownContent content={page.content} />
      {children}
      {page.links && <SectionLinks links={page.links} />}
    </Article>
  );
}

interface MarkdownContentProps {
  content: string;
}

function MarkdownContent({ content }: MarkdownContentProps) {
  return parseMarkdown(content).map((block, blockIndex) => renderBlock(block, blockIndex));
}

interface SectionLinkProps {
  link: StaticPageLink;
}

function SectionLink({ link }: SectionLinkProps) {
  const card = (
    <Card className="h-full transition-colors hover:bg-muted/60">
      <CardHeader>
        <CardTitle>{link.label}</CardTitle>
        <CardDescription>{link.description}</CardDescription>
      </CardHeader>
    </Card>
  );

  return link.href.startsWith("http") ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:no-underline">
      {card}
    </a>
  ) : (
    <Link href={link.href} className="hover:no-underline">
      {card}
    </Link>
  );
}

type SectionLinksProps = Pick<StaticPageContent, "links">;

function SectionLinks({ links }: SectionLinksProps) {
  return !links ? null : (
    <section className="break-inside-avoid-column space-y-4 pt-2">
      <H2 variant="plain" className="text-2xl tracking-tight">
        Explore this section
      </H2>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <SectionLink key={link.href} link={link} />
        ))}
      </div>
    </section>
  );
}

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
}

function SmartLink({ href, children }: SmartLinkProps) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

const cleanInlineText = (text: string) =>
  text
    .replace(/\\([*_])/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isListLine = (line: string) => /^[-*+]\s+\S/.test(line);

const isOrderedListLine = (line: string) => /^\d{1,9}[.)]\s+\S/.test(line);

const isTableLine = (line: string) => line.startsWith("|") && line.endsWith("|");

function normalizeHref(href: string) {
  const normalized = href.trim().replace(/\s+"[^"]*"$/, "");
  return /^(#|\/|https?:\/\/)/.test(normalized) ? normalized : undefined;
}

function parseMarkdown(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = content.split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,5})\s+(.+)$/);
    if (heading?.[1] && heading[2]) {
      blocks.push({ kind: "heading", level: heading[1].length, text: cleanInlineText(heading[2]) });
      index += 1;
      continue;
    }

    if (line === "---") {
      index += 1;
      continue;
    }

    if (isTableLine(line)) {
      const tableLines: string[] = [];
      while (index < lines.length && isTableLine(lines[index]?.trim() ?? "")) {
        tableLines.push(lines[index]?.trim() ?? "");
        index += 1;
      }
      const table = parseTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }

    if (isOrderedListLine(line)) {
      const items: string[] = [];
      const start = Number.parseInt(line, 10);
      while (index < lines.length && isOrderedListLine(lines[index]?.trim() ?? "")) {
        items.push(cleanInlineText((lines[index]?.trim() ?? "").replace(/^\d{1,9}[.)]\s+/, "")));
        index += 1;
      }
      blocks.push({ kind: "ordered-list", start, items });
      continue;
    }

    if (isListLine(line)) {
      const items: string[] = [];
      while (index < lines.length && isListLine(lines[index]?.trim() ?? "")) {
        items.push(cleanInlineText((lines[index]?.trim() ?? "").replace(/^[-*+]\s+/, "")));
        index += 1;
      }
      blocks.push({ kind: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index]?.trim() ?? "";
      if (
        !current ||
        current === "---" ||
        /^(#{2,5})\s+/.test(current) ||
        isListLine(current) ||
        isOrderedListLine(current) ||
        isTableLine(current)
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }

    const paragraph = cleanInlineText(paragraphLines.join(" "));
    if (paragraph) blocks.push({ kind: "paragraph", text: paragraph });
  }

  return blocks;
}

function parseTable(lines: string[]): MarkdownBlock | null {
  const rows = lines.map((line) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cleanInlineText(cell.trim())),
  );

  if (rows.length < 2) return null;

  const isSeparatorRow = (row: string[]) =>
    row.length > 0 && row.every((cell) => /^:?-{3,}:?$/.test(cell));

  const separatorIndex = rows.findIndex(isSeparatorRow);
  const nonEmpty = (row: string[]) => row.some(Boolean);

  let headers: string[];
  let body: string[][];

  if (separatorIndex >= 0) {
    const beforeSeparator = separatorIndex > 0 ? (rows[separatorIndex - 1] ?? []) : [];
    const afterSeparator = rows.slice(separatorIndex + 1).filter(nonEmpty);

    // Empty placeholder header rows (common in pasted tables) — promote the first body row.
    if (beforeSeparator.some(Boolean)) {
      headers = beforeSeparator;
      body = afterSeparator;
    } else if (afterSeparator[0]) {
      headers = afterSeparator[0];
      body = afterSeparator.slice(1);
    } else {
      return null;
    }
  } else {
    const dataRows = rows.filter(nonEmpty);
    if (dataRows.length < 2) return null;
    headers = dataRows[0] ?? [];
    body = dataRows.slice(1);
  }

  if (!headers.some(Boolean) || body.length === 0) return null;

  return { kind: "table", headers, rows: body };
}

function renderBlock(block: MarkdownBlock, blockIndex: number) {
  const blockKey = `block-${blockIndex}`;
  if (block.kind === "heading") {
    if (block.level <= 2)
      return (
        <H2 key={blockKey} variant="plain" className="text-2xl tracking-tight">
          {renderInline(block.text)}
        </H2>
      );

    if (block.level === 3)
      return (
        <H3 key={blockKey} className="text-xl">
          {renderInline(block.text)}
        </H3>
      );

    return (
      <H4 key={blockKey} className="text-lg">
        {renderInline(block.text)}
      </H4>
    );
  }

  if (block.kind === "list" || block.kind === "ordered-list") {
    const items = block.items.map((item) => (
      <li key={`${blockKey}-item-${item}`}>{renderInline(item)}</li>
    ));

    return block.kind === "ordered-list" ? (
      <Ol key={blockKey} start={block.start}>
        {items}
      </Ol>
    ) : (
      <Ul key={blockKey}>{items}</Ul>
    );
  }

  if (block.kind === "table") {
    return (
      <Table
        key={blockKey}
        headers={block.headers.map((header) => renderInline(header))}
        rows={block.rows.map((row) => row.map((cell) => renderInline(cell)))}
      />
    );
  }
  return <P key={blockKey}>{renderInline(block.text)}</P>;
}

function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) nodes.push(text.slice(lastIndex, matchIndex));

    const label = match[1];
    const href = match[2];
    const strongEmphasisText = match[3];
    const strongText = match[4];
    const emphasisText = match[5];

    if (label && href) {
      const normalizedHref = normalizeHref(href);
      nodes.push(
        normalizedHref ? (
          <SmartLink key={key} href={normalizedHref}>
            {cleanInlineText(label)}
          </SmartLink>
        ) : (
          cleanInlineText(label)
        ),
      );
    } else if (strongEmphasisText) {
      nodes.push(
        <Strong key={key}>
          <Em>{renderInline(strongEmphasisText)}</Em>
        </Strong>,
      );
    } else if (strongText) {
      nodes.push(<Strong key={key}>{renderInline(strongText)}</Strong>);
    } else if (emphasisText) {
      nodes.push(<Em key={key}>{renderInline(emphasisText)}</Em>);
    }

    key += 1;
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes.length > 0 ? nodes : text;
}
