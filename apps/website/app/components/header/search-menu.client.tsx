"use client";

import Highlighted from "@components/highlighted";
import { Button } from "@components/ui/button";
import type { SearchHit } from "@lib/search/find-results";
import { SEARCH_SUGGESTIONS } from "@lib/search/suggestions";
import { cn } from "@lib/utils";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import useMeasuredHeight from "./hooks/use-measured-height";
import useSearchMenu from "./hooks/use-search-menu";

export default function SearchMenu() {
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    close,
    submit,
    settled,
    isPending,
    shouldReduceMotion,
  } = useSearchMenu();
  const trimmed = query.trim();

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger className="text-navy-600 hover:text-primary-ink hover:bg-accent data-[state=open]:bg-accent data-[state=open]:text-primary-ink absolute top-2 right-14 flex cursor-pointer items-center gap-1.5 rounded-lg p-2 text-base transition-colors xl:static xl:px-3">
        <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6 xl:h-5 xl:w-5" />
        <span className="sr-only xl:not-sr-only">Search</span>
      </Popover.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Popover.Portal forceMount>
            <Popover.Content
              asChild
              forceMount
              align="end"
              sideOffset={12}
              collisionPadding={12}
              aria-label="Search the site"
            >
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                className="border-t-primary bg-popover z-20 w-[min(calc(100vw-1.5rem),28rem)] origin-(--radix-popover-content-transform-origin) rounded-xl border border-t-4 p-4 shadow-xl"
              >
                <search className="block space-y-3">
                  <form action="/search" onSubmit={submit}>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2"
                      />
                      <input
                        type="search"
                        name="q"
                        value={query}
                        onChange={(event) => {
                          setQuery(event.target.value);
                        }}
                        aria-label="What are you looking for?"
                        maxLength={100}
                        enterKeyHint="search"
                        autoComplete="off"
                        placeholder="Homework, schedule, forms…"
                        className="bg-muted/60 text-foreground placeholder:text-muted-foreground outline-border focus:bg-background focus:outline-ring h-12 w-full rounded-lg pr-14 pl-11 text-base outline-1 -outline-offset-1 transition-colors focus:outline-2 focus:-outline-offset-2"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        aria-label="Search"
                        className="absolute top-1/2 right-1.5 size-9 -translate-y-1/2"
                      >
                        <ArrowRightIcon aria-hidden="true" className="size-5" />
                      </Button>
                    </div>
                  </form>

                  <a
                    href="https://www.algolia.com/?utm_medium=AOS-referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring ml-auto flex min-h-11 w-fit items-center gap-1.5 rounded text-xs hover:no-underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    Search by
                    <Image
                      src="/algolia-logo-blue.svg"
                      alt="Algolia"
                      width={2196}
                      height={500}
                      className="h-4 w-auto"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>

                  <AnimatedHeight shouldReduceMotion={shouldReduceMotion}>
                    {!trimmed ? (
                      <Suggestions onSelect={close} />
                    ) : (
                      <Results
                        query={trimmed}
                        hits={settled?.hits ?? null}
                        hasFailed={settled?.hasFailed ?? false}
                        isPending={isPending}
                        onSelect={close}
                      />
                    )}
                  </AnimatedHeight>
                </search>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}

interface AnimatedHeightProps {
  children: ReactNode;
  shouldReduceMotion: boolean | null;
}

function AnimatedHeight({ children, shouldReduceMotion }: AnimatedHeightProps) {
  const { ref, height } = useMeasuredHeight<HTMLDivElement>();

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }
      }
      className="overflow-hidden"
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

interface ResultsProps {
  query: string;
  hits: SearchHit[] | null;
  hasFailed: boolean;
  isPending: boolean;
  onSelect: () => void;
}

function Results({ query, hits, hasFailed, isPending, onSelect }: ResultsProps) {
  if (!hits)
    return (
      <p role="status" className="text-muted-foreground px-1 py-2 text-sm">
        Searching…
      </p>
    );

  return (
    <div className={cn("space-y-2 transition-opacity", isPending && "opacity-60")}>
      <p
        role="status"
        className={hits.length === 0 ? "text-muted-foreground px-1 py-2 text-sm" : "sr-only"}
      >
        {hasFailed
          ? "Search is unavailable right now. Use the arrow to try the full search page."
          : hits.length === 0
            ? `No quick results for “${query}”. Use the arrow to search the whole site.`
            : hits.length === 1
              ? "1 result"
              : `${hits.length} results`}
      </p>

      {hits.length === 0 ? null : (
        <>
          <ul className="space-y-0.5">
            {hits.map((hit) => (
              <li key={hit.id}>
                <Link
                  href={hit.href}
                  onClick={onSelect}
                  className="hover:bg-primary-50 focus-visible:ring-ring block rounded-lg px-3 py-2 hover:no-underline focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                >
                  <span className="text-muted-foreground block text-xs">{hit.section}</span>
                  <span className="text-secondary block font-semibold">
                    <Highlighted parts={hit.title} />
                  </span>
                  {hit.snippet.length === 0 ? null : (
                    <span className="text-muted-foreground line-clamp-1 block text-sm">
                      <Highlighted parts={hit.snippet} />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onSelect}
            className="text-navy-600 hover:bg-accent focus-visible:ring-ring flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:no-underline focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
          >
            See all results
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Link>
        </>
      )}
    </div>
  );
}

interface SuggestionsProps {
  onSelect: () => void;
}

function Suggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Popular searches
      </p>
      <ul className="flex flex-wrap gap-2">
        {SEARCH_SUGGESTIONS.map((suggestion) => (
          <li key={suggestion}>
            <Link
              href={`/search?q=${encodeURIComponent(suggestion)}`}
              onClick={onSelect}
              className="text-navy-600 bg-accent hover:bg-primary-100 hover:text-primary-ink focus-visible:ring-ring block rounded-full px-3 py-1 text-sm font-medium transition-colors hover:no-underline focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
            >
              {suggestion}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
