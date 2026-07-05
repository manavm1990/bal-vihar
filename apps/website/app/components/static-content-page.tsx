import type { StaticPageContent } from "@lib/static-page-content";
import Link from "next/link";
import Article from "./article";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { H3, H4, H5, P, Strong, Table } from "./ui/typography";

type MarkdownBlock =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

// Maps legacy `content.php?page=` identifiers (and a few legacy `.php` paths) to new
// routes. A Map is used instead of an object literal so the legacy identifiers remain
// string values rather than property names, which would violate useNamingConvention.
const INTERNAL_LINKS = new Map<string, string>([
  ["History", "/about-us/history"],
  ["President___s_Message", "/presidents-message"],
  ["advboard", "/about-us/advisory-board"],
  ["board.php", "/about-us/administrative-team"],
  ["Policies___Procedures", "/about-us/policies-procedures"],
  ["Community_Outreach", "/about-us/community-outreach"],
  ["Bal_Vihar", "/about-us"],
  ["about.php", "/about-us"],
  ["contact.php", "/questions"],
  ["FAQs", "/questions"],
  ["Admissions", "/admissions"],
  ["Admission_Process", "/admissions/admission-process"],
  ["Tuition", "/admissions/tuition"],
  ["Refund_Policy", "/admissions/refund-policy"],
  ["Education", "/education"],
  ["Curriculum_", "/education/curriculum-k-7"],
  ["Curriculum_Youth_Group", "/education/curriculum-youth-group"],
  ["Education_Policy", "/education/education-policy"],
  ["Class_Webpages", "/education/class-webpages"],
  ["Class_Schedule", "/education/class-schedule"],
  ["School", "/education/facility"],
  ["Giving", "/giving"],
  ["Welcome_Message", "/giving/welcome-message"],
  ["Give_Online", "/giving/give-online"],
  ["Make_a_Gift_", "/giving/make-a-gift"],
  ["Matching_Gift_Program", "/giving/matching-gift-program"],
  ["Matching_Gift_Companies", "/giving/matching-gift-companies"],
  ["Event_Sponsors", "/giving/event-sponsors"],
  ["Volunteering", "/volunteering"],
  ["Why_Volunteer_", "/volunteering/why-volunteer"],
  ["Volunteer_Opportunities", "/volunteering/volunteer-opportunities"],
  ["Volunteering_Policies", "/volunteering/volunteer-policies"],
  ["Volunteers_List", "/volunteering/volunteers-list"],
  ["form.php?form_id=11", "/volunteering/volunteer-application"],
]);

interface StaticContentPageProps {
  page: StaticPageContent;
}

export default function StaticContentPage({ page }: StaticContentPageProps) {
  return (
    <Article title={page.title} className={page.singleColumn ? "md:columns-1" : undefined}>
      <MarkdownContent content={page.content} />
      {page.links && <SectionLinks links={page.links} />}
    </Article>
  );
}

function SectionLinks({ links }: Pick<StaticPageContent, "links">) {
  if (!links) return null;

  return (
    <section className="break-inside-avoid-column space-y-4 pt-2">
      <H3>Explore this section</H3>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:no-underline">
            <Card className="h-full transition-colors hover:bg-muted/60">
              <CardHeader>
                <CardTitle>{link.label}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return parseMarkdown(content).map((block) => renderBlock(block));
}

function renderBlock(block: MarkdownBlock) {
  const blockKey = getBlockKey(block);
  if (block.kind === "heading") {
    if (block.level <= 2) return <H3 key={blockKey}>{renderInline(block.text)}</H3>;
    if (block.level === 3) return <H4 key={blockKey}>{renderInline(block.text)}</H4>;
    return <H5 key={blockKey}>{renderInline(block.text)}</H5>;
  }

  if (block.kind === "list") {
    return (
      <ul key={blockKey} className="list-disc space-y-2 pl-6">
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.kind === "table") {
    return <Table key={blockKey} headers={block.headers} rows={block.rows} />;
  }
  return <P key={blockKey}>{renderInline(block.text)}</P>;
}

function getBlockKey(block: MarkdownBlock) {
  if (block.kind === "heading" || block.kind === "paragraph") return `${block.kind}-${block.text}`;
  if (block.kind === "list") return `${block.kind}-${block.items.join("|")}`;
  return `${block.kind}-${block.headers.join("|")}-${block.rows.map((row) => row.join("|")).join("||")}`;
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

function isListLine(line: string) {
  return /^[-*+]\s+\S/.test(line);
}

function isTableLine(line: string) {
  return line.startsWith("|") && line.endsWith("|");
}

function parseTable(lines: string[]): MarkdownBlock | null {
  const rows = lines
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cleanInlineText(cell.trim())),
    )
    .filter((row) => row.some(Boolean));

  if (rows.length < 2) return null;

  const firstBodyRow = rows[1]?.every((cell) => /^:?-{3,}:?$/.test(cell)) ? 2 : 1;
  const headers = rows[0] ?? [];
  const body = rows.slice(firstBodyRow).filter((row) => row.some(Boolean));

  if (!headers.some(Boolean) || body.length === 0) return null;

  return { kind: "table", headers, rows: body };
}

function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) nodes.push(text.slice(lastIndex, matchIndex));

    const label = match[1];
    const href = match[2];
    const strongText = match[3];
    const emphasisText = match[4];

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
    } else if (strongText) {
      nodes.push(<Strong key={key}>{cleanInlineText(strongText)}</Strong>);
    } else if (emphasisText) {
      nodes.push(
        <em key={key} className="italic">
          {cleanInlineText(emphasisText)}
        </em>,
      );
    }

    key += 1;
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes.length > 0 ? nodes : text;
}

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
}

function normalizeHref(href: string) {
  const normalized = href
    .trim()
    .replace(/\s+"[^"]*"$/, "")
    .replace(/^https:\/\/balvihar-stlouis\.com\/?/, "")
    .replace(/^https:\/\/balvihar-stlouis\.starchapter\.com\/?/, "");

  if (normalized.startsWith("#")) return normalized;
  if (normalized.startsWith("http")) return normalized;

  const withoutLeadingSlash = normalized.replace(/^\//, "");
  const contentMatch = withoutLeadingSlash.match(/^content\.php\?page=([^&]+)/);
  const key = contentMatch?.[1] ?? withoutLeadingSlash;

  return INTERNAL_LINKS.get(key);
}

function cleanInlineText(text: string) {
  return text
    .replace(/\\([*_])/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
