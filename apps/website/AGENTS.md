# apps/website

The root [`../../AGENTS.md`](../../AGENTS.md) is canonical: read and follow it first. This file adds only what is specific to the website.

## Commands

From the repo root: `turbo run typecheck lint --filter=@bv/website`. Tests are `node:test` files with no `test` script; run `bun test app` from this directory. The developer often has `:3000` open; if you are asked to start a dev server, use a spare port (`next dev --turbopack -p 3100`) and stop it afterwards.

## Where things live

- `app/lib/sanity/`: GROQ in `queries.ts` (`defineQuery`), fetching through `sanityFetch` from `live.ts`, and `map-*.ts`, `policies.ts` and `volunteers-list.ts` shaping the results. Pages read Sanity only: an empty result renders an empty state, never other content.
- `app/lib/static-page-content.ts` and `components/static-content-page.tsx`: static pages written as markdown strings. Links must be real, current paths, because `normalizeHref` drops anything else. Terms and Privacy are plain pages, edited by hand.
- Forms: `lib/hooks/use-action-form.ts` (Valibot, React Hook Form, server action), `lib/form.ts` (shared Valibot helpers), `components/ui/fields.tsx` (field primitives, like `typography.tsx`), and `components/ui/form-success.client.tsx`. Each route keeps `actions.ts`, `types.ts` (the schema), `use-*.ts` and `client.tsx` in a `form/` folder (a route-level `components/` folder is only for real scoped components); upload forms add `data.ts` + `form.test.ts`. The server action re-validates with the same schema. Uploads travel as `FormData` (see `expense-reimbursement`); the request body limit is set in `next.config.ts`.

## Design

Tokens live in `app/globals.css` (`@theme`); that file is the source of truth. Use token utilities, never hard-coded colors.

- **Headings** are `font-display` (Baloo 2) in `text-navy` (set globally; don't restyle per component). Body is Poppins (`font-sans`).
- **Saffron (`primary`) is a fill.** Text on it is `text-primary-foreground` (navy); never white. Saffron-colored text or icons use `primary-ink` or `primary-700`.
- **Green (`secondary`)** is the secondary button, check states and card titles. Navy bands and the footer (`bg-navy`, `bg-navy-900`) use white text and `text-primary` numerals.
- **Bands** alternate `background`, `bg-primary-50` (cream) and `bg-muted` (lavender).
- **Shapes:** buttons are pills (`rounded-full`), cards and bands use `rounded-lg` (16px), inputs `rounded-md`. Cards have a 1px `border` and `shadow-sm`; no left-border accents.
- **Links** are `navy-600`, underlined inside paragraphs, with `primary-ink` on hover.
- **Contrast:** text must meet 4.5:1 (3:1 for 24px+ text and for focus rings). Check any new color pair.
- **Photos** come from Sanity; never ship placeholder tiles or stand-in images.

## Gotchas

- Dev serves Sanity results from `.next/dev/cache/fetch-cache`. After content is created or changed outside a connected browser, an old "empty" result can stick: delete that folder and restart `next dev`.
- No legacy: do not add redirects or support for old-site URLs (`*.php`, old subdomains).

## Before you finish

The developer runs typecheck, tests, builds and dev servers. Agents run Biome only on the files they touched (`bunx biome check --write <files>`) and never start those unasked. Finish by listing the changed pages and what to check on each (content, not only the status code).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
