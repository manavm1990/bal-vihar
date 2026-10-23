# apps/website

The root [`../../AGENTS.md`](../../AGENTS.md) is canonical: read and follow it first. This file adds only what is specific to the website.

## Commands

From the repo root: `turbo run typecheck lint --filter=@bv/website`. Tests are `node:test` files with no `test` script; run `bun test app` from this directory. The developer often has `:3000` open, so use a spare port (`next dev --turbopack -p 3100`) for throwaway checks and stop it afterwards.

## Where things live

- `app/lib/sanity/`: GROQ in `queries.ts` (`defineQuery`), fetching through `sanityFetch` from `live.ts`, and `map-*.ts`, `policies.ts` and `volunteers-list.ts` shaping the results. Pages read Sanity only: an empty result renders an empty state, never other content.
- `app/lib/static-page-content.ts` and `components/static-content-page.tsx`: static pages written as markdown strings. Links must be real, current paths, because `normalizeHref` drops anything else. Terms and Privacy are plain pages, edited by hand.
- Forms: `lib/hooks/use-action-form.ts` (Valibot, React Hook Form, server action) and `components/ui/form/*`. Each route keeps `actions.ts`, `*.types.ts` (the schema), `use-*.ts` and `*-form.client.tsx` in a `components/form/` folder, and the server action re-validates with the same schema. Uploads travel as `FormData` (see `expense-reimbursement`); the request body limit is set in `next.config.ts`.

## Gotchas

- Dev serves Sanity results from `.next/dev/cache/fetch-cache`. After content is created or changed outside a connected browser, an old "empty" result can stick: delete that folder and restart `next dev`.
- No legacy: do not add redirects or support for old-site URLs (`*.php`, old subdomains).

## Before you finish

Run typecheck, lint and `bun test app`, then load the changed pages from a dev server and check their content, not only the status code.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
