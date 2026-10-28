"use client";

import type { DirectoryEntry } from "@lib/sanity/directory";
import { useState } from "react";
import PageSection from "./page-section";
import PersonContact from "./person-contact";
import { MutedP, Ul } from "./ui/typography";

interface DirectoryProps {
  entries: DirectoryEntry[];
}

export default function Directory({ entries }: DirectoryProps) {
  const { query, setQuery, shown } = useDirectorySearch(entries);

  return (
    <PageSection id="everyone" title="Everyone, A to Z">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="directory-search" className="text-sm font-semibold">
          Search by name
        </label>
        <input
          id="directory-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border-input bg-background focus-visible:ring-ring h-11 w-full max-w-sm rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <MutedP aria-live="polite">
          {shown.length} {shown.length === 1 ? "person" : "people"}
        </MutedP>
      </div>
      {shown.length === 0 ? (
        <MutedP>No one matches that name.</MutedP>
      ) : (
        <Ul variant="unstyled" className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((entry) => (
            <li key={entry.id} className="min-w-0 space-y-1">
              <PersonContact person={entry} />
              <div className="flex flex-wrap gap-1">
                {entry.roles.map((role) => (
                  <span key={role} className="bg-muted rounded px-2 py-0.5 text-xs">
                    {role}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </Ul>
      )}
    </PageSection>
  );
}

function useDirectorySearch(entries: DirectoryEntry[]) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const shown = needle
    ? entries.filter((entry) => entry.name.toLowerCase().includes(needle))
    : entries;

  return { query, setQuery, shown };
}
