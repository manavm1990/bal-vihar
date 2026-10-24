import Article from "@components/article";
import { Button } from "@components/ui/button";
import { CONTROL_CLASS } from "@components/ui/form/field";
import { Label } from "@components/ui/form/label";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { searchAlgolia } from "@lib/search/algolia";
import { getSanitySearchDocuments } from "@lib/search/sanity-documents";
import {
  type HighlightPart,
  parseSearchQuery,
  type SearchResult,
  searchDocuments,
} from "@lib/search/search";
import { STATIC_SEARCH_DOCUMENTS } from "@lib/search/static-documents";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

const RESULT_LIMIT = 20;

const SUGGESTIONS = ["homework", "schedule", "registration", "forms", "volunteer", "teachers"];

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Search`,
  description: "Search Bal Vihar of St. Louis for classes, events, policies and forms.",
  // Results pages only duplicate the content they point to.
  robots: { index: false },
};

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Article title="Search" className="md:columns-1">
      <Suspense fallback={<SearchForm query="" />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </Article>
  );
}

interface HighlightedProps {
  parts: HighlightPart[];
}

function Highlighted({ parts }: HighlightedProps) {
  // Each part's key is where it starts in the text, which is unique and stable.
  let offset = 0;

  return (
    <>
      {parts.map((part) => {
        const key = offset;
        offset += part.text.length;

        return part.isMatch ? (
          <mark key={key} className="bg-primary-200 text-foreground rounded-sm px-0.5">
            {part.text}
          </mark>
        ) : (
          <span key={key}>{part.text}</span>
        );
      })}
    </>
  );
}

interface SearchFormProps {
  query: string;
}

function SearchForm({ query }: SearchFormProps) {
  return (
    <search>
      <form action="/search" className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <Label htmlFor="search-query">What are you looking for?</Label>
          <input
            id="search-query"
            type="search"
            name="q"
            defaultValue={query}
            maxLength={100}
            enterKeyHint="search"
            placeholder="For example: homework, schedule, forms"
            className={CONTROL_CLASS}
          />
        </div>
        <Button type="submit" size="lg">
          Search
        </Button>
      </form>
    </search>
  );
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const query = parseSearchQuery((await searchParams)["q"]);
  const results = query ? await findResults(query) : [];

  return (
    <div className="space-y-6">
      <SearchForm query={query} />
      {!query ? (
        <SearchSuggestions />
      ) : results.length === 0 ? (
        <div className="space-y-3" role="status">
          <P>No results for “{query}”.</P>
          <MutedP>
            Try fewer or different words. You can also browse the{" "}
            <Link href="/calendar">calendar</Link> or the{" "}
            <Link href="/education/class-webpages">class webpages</Link>, or{" "}
            <Link href="/questions">contact us</Link> and we will help.
          </MutedP>
        </div>
      ) : (
        <>
          <MutedP role="status">
            {results.length === 1 ? "1 result" : `${results.length} results`} for “{query}”
          </MutedP>
          <ul className="space-y-3">
            {results.map(({ document, title, snippet }) => (
              <li key={document.id}>
                <Link
                  href={document.href}
                  className="bg-background hover:bg-primary-50 focus-visible:ring-ring block rounded-lg border p-4 shadow-sm hover:no-underline focus-visible:ring-2 focus-visible:outline-none"
                >
                  <MutedP className="text-sm">{document.section}</MutedP>
                  <span className="text-secondary block text-lg font-semibold">
                    <Highlighted parts={title} />
                  </span>
                  {snippet.length === 0 ? null : (
                    <MutedP className="text-sm">
                      <Highlighted parts={snippet} />
                    </MutedP>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function SearchSuggestions() {
  return (
    <div className="space-y-2">
      <MutedP>Not sure what to type? Try one of these:</MutedP>
      <ul className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <li key={suggestion}>
            <Button asChild variant="outline" size="sm">
              <Link href={`/search?q=${encodeURIComponent(suggestion)}`}>{suggestion}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Algolia first, which forgives typos. The built-in search takes over if Algolia is unavailable. */
async function findResults(query: string): Promise<SearchResult[]> {
  const fromAlgolia = await searchAlgolia(query, RESULT_LIMIT);
  if (fromAlgolia) return fromAlgolia;

  return searchDocuments(
    [...STATIC_SEARCH_DOCUMENTS, ...(await getSanitySearchDocuments())],
    query,
    {
      limit: RESULT_LIMIT,
    },
  );
}
