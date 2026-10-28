import Article from "@components/article";
import Highlighted from "@components/highlighted";
import { Button } from "@components/ui/button";
import { CONTROL_CLASS, Label } from "@components/ui/fields";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { findResults } from "@lib/search/find-results";
import { parseSearchQuery } from "@lib/search/search";
import { SEARCH_SUGGESTIONS } from "@lib/search/suggestions";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

const RESULT_LIMIT = 10;

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Search`,
  description: "Search Bal Vihar of St. Louis for classes, events, policies and forms.",
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
  const results = query ? await findResults(query, RESULT_LIMIT) : [];

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
        {SEARCH_SUGGESTIONS.map((suggestion) => (
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
