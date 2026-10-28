import type { SearchDocument } from "./search";

interface CrawledPage {
  path: string;
  title: string;
  section: string;
}

function decodeEntities(value: string) {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  } as const;

  return value.replaceAll(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));

    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));

    return named[code.toLowerCase()] ?? match;
  });
}

const stripHtml = (html: string) =>
  decodeEntities(
    html
      .replaceAll(/<(script|style|svg|template|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      .replaceAll(/<!--[\s\S]*?-->/g, "")
      .replaceAll(/<\/(?:p|div|li|h[1-6]|section|article|tr|ul|ol|dt|dd)>|<br\s*\/?>/gi, " ")
      .replaceAll(/<[^>]+>/g, ""),
  )
    .replaceAll(/\s+/g, " ")
    .trim();

export async function crawlPageDocuments(origin: string): Promise<SearchDocument[]> {
  const pages = [
    { path: "/giving", title: "Giving", section: "Get Involved" },
    { path: "/new-families", title: "New families", section: "Education" },
  ] as const;

  const documents = await Promise.all(
    pages.map(async (page) => {
      try {
        const response = await fetch(`${origin}${page.path}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`${page.path} answered ${response.status}`);

        return createPageDocuments(page, await response.text());
      } catch (error) {
        console.error(`Could not read ${page.path} for search`, error);

        return [];
      }
    }),
  );

  return documents.flat();
}

export function createPageDocuments(page: CrawledPage, html: string): SearchDocument[] {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;

  return main.split(/(?=<h2[\s>])/i).flatMap((chunk, index): SearchDocument[] => {
    const heading = chunk.match(/^<h2([^>]*)>([\s\S]*?)<\/h2>([\s\S]*)$/i);
    const title = heading ? stripHtml(heading[2] ?? "") : page.title;
    const text = stripHtml(heading ? (heading[3] ?? "") : chunk);
    if (!title || !text) return [];

    const anchor = heading?.[1]?.match(/\bid="([^"]+)"/)?.[1]?.replace(/-heading$/, "");

    return [
      {
        id: `crawl:${page.path}:${index}`,
        title,
        section: `${page.section} › ${page.title}`,
        href: anchor ? `${page.path}#${anchor}` : page.path,
        text,
      },
    ] as const;
  });
}
