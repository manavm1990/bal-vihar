# AGENTS.md

This file is the canonical source of AI agent instructions for this repository.
If tool-specific instruction files exist, they should defer to this file.

## Project Overview

**Bal Vihar of St. Louis**: a Turborepo monorepo with a Next.js 16 website and a Sanity Studio CMS for the Center for Indian Cultural Education, a community organization that teaches Indian culture and values to children.

```
apps/website/            Next.js 16 public site (App Router, Turbopack)
apps/studio/             Sanity Studio
packages/schemas/        Shared Sanity schemas and generated types
packages/typescript-config/
```

Stack: Bun, Next.js 16, React 19, strict TypeScript, Tailwind CSS v4, Radix UI, React Hook Form + Valibot, Sanity + `next-sanity`, Biome.

## Commands

Run from the repo root (Turborepo fans out to each workspace):
- `bun run dev` - website and studio dev servers
- `bun run build` - build all workspaces
- `bun run lint` / `bun run lint:fix` - Biome check / autofix
- `bun run typecheck` - `tsc --noEmit` in every workspace
- `bun run typegen` - Sanity `schema.json` + `sanity.types.ts` (studio only); commit the output
- `bun run deploy:studio` - publish the hosted Studio (needed after schema or desk changes; needs `bunx sanity login`)

Scope a task with `turbo run <task> --filter=@bv/<name>`. Pre-push runs typegen then typecheck, so commit regenerated type files.

## Code Standards

- Strict TypeScript (`noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`); no `any`.
- Accessibility rules are enforced; use semantic HTML, labelled form controls and proper heading order.
- Imports are ordered and cycle-checked by Biome.
- Prefer custom hooks over direct hook use in components.
- Tailwind utility classes and existing design tokens only; no inline styles, no custom CSS unless unavoidable. Use the established component library (Radix UI) for UI primitives.
- Mobile-first responsive design. Variants via `class-variance-authority`.
- Forms: Valibot schema, React Hook Form for state, a server action (`'use server'`) for submission, typed inputs (`ContactFormInputs` pattern).

Path aliases (`apps/website`): `@components/*` -> `./app/components/*`, `@lib/*` -> `./app/lib/*`. Workspace packages: `@bv/schemas`, `@bv/typescript-config`.

### Website component file organization (`apps/website`)

- **One exported component per file** when the file is a page or shared module.
- **Exception: UI primitive families** (currently `app/components/ui/typography.tsx`) live in one file with named exports, ordered: imports, types, props interfaces, exported components (alphabetical), then private helpers (`cva` variants, helper components, functions; alphabetical).
- **Every exported primitive gets a one-line TSDoc plus an `@example`** showing real usage. Style differences are typed `variant`s (via `cva`), never an `as` prop; each component fixes its HTML element. Spread the element's native props (`ComponentPropsWithoutRef<"h2">`) and merge `className` with `cn()`.
- **File order, top to bottom:** imports; shared types (anything that is not a component's props); constants (`SCREAMING_SNAKE_CASE`); the **exported component first**; other colocated components, alphabetical; then **utility functions (anything that is not a component) below all components**, alphabetical.
- **A component's props type sits directly above that component.** Only non-props types go under the imports.
- **Components and hooks are always `function` declarations**, never arrows, and the one a file exists for is `export default function` (`export default function Page() { return (…); }`, `export default function useContact() { return useActionForm({…}); }`), even when the body is a single `return`. Single-use components are colocated below the exported one, not moved to their own file.
- **Utilities (neither components nor hooks): single-statement functions are implicit-return arrows** (`const isTableLine = (line: string) => …`); multi-statement ones are `function` declarations. `is*` helpers are plain boolean predicates; use a type guard (`x is T`) only when it narrows a union.
- **Name utilities with verbs** (`createParagraph`, `getPolicies`, `isTableLine`, `parseMarkdown`, `normalizeHref`). Nouns and PascalCase are for components, and hooks start with `use`. A function named like a noun reads as a component.
- Colocated helpers are only called at render time, so arrows below the component are safe. **Module-level data built while the module loads** (such as schema field definitions) must define its arrow helpers _above_ that data, since arrows are not hoisted.
- **Sort lists alphabetically** (case-insensitive): barrel `export { … }` blocks and registries such as `schemaTypes`. Generated files (`sanity.types.ts`, `schema.json`) are never hand-edited.
- **Client components** use the `name.client.tsx` suffix and `"use client"` (opt-in). All other components are server components by default.
- **Shared/reused UI** gets its own file under `app/components/` (kebab-case). Do not extract a separate file for single-use server presentational pieces.
- Prefer **omitting braces** on single-statement `if` bodies (including multi-line `return (` … `)`).
- Prefer **ternary returns** for simple null/branch UI: `return !src ? null : ( <Image … /> );`

## Agent Skills

Skills live in `.agents/skills/`. Read the matching `SKILL.md` (and only the needed `references/` files) before doing work in that domain.

| Skill                         | Use when                                                                                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sanity-best-practices`       | Schemas (`defineType` / `defineField`), GROQ / `defineQuery`, TypeGen, Portable Text, images, Studio structure, Visual Editing, Sanity + Next.js integration, Functions/Blueprints |
| `seo-aeo-best-practices`      | Page/metadata SEO, Open Graph, sitemaps, `robots.txt`, JSON-LD, EEAT, AI-answer (AEO) readiness                                                                                    |
| `turborepo`                   | `turbo.json`, pipelines, caching, `--filter` / `--affected`, internal packages, monorepo task wiring                                                                               |
| `frontend-ui-engineering`     | Building or changing user-facing UI, layouts, accessibility, component state                                                                                                       |
| `frontend-design`             | New or reshaped visual design, typography, distinctive aesthetic direction                                                                                                         |
| `vercel-composition-patterns` | Compound components, boolean-prop cleanup, flexible component APIs, React 19 composition patterns                                                                                  |
| `web-design-guidelines`       | UI/UX accessibility or interface-guideline audits                                                                                                                                  |
| `vercel-react-best-practices` | React/Next performance: waterfalls, bundle size, server/client data fetching                                                                                                       |
- Prefer the single most specific skill first; load a second only when the task truly crosses domains.
- Sanity content modeling and Studio work -> `sanity-best-practices` (not ad-hoc schema guesses).
- Public page SEO, metadata or structured data -> `seo-aeo-best-practices`.
- Monorepo, build or package work -> `turborepo`.
- UI implementation -> `frontend-ui-engineering`; visual direction -> `frontend-design`; component API shape -> `vercel-composition-patterns`.
- Finish non-trivial changes with the built-in `/code-review`.
- Do not add, remove or broaden the skill set unless explicitly asked.

## MCP Servers

- `next-devtools` - Next.js 16 diagnostics and guidance
- `sanity` - Sanity content and schema
- `vercel` - deployments, build and runtime logs

## Sanity

- Shared schemas/types: `packages/schemas`
- Studio app: `apps/studio`
- Public site consumption: `apps/website`

Follow `.agents/skills/sanity-best-practices/SKILL.md` and load only the relevant references (usually `references/schema.md`, `references/groq.md`, and/or `references/nextjs.md`).
1. **Schemas first in the shared package** — define or change document/object types in `packages/schemas`, not duplicated inside the website app.
2. **Studio follows shared schemas** — wire Studio structure/plugins in `apps/studio`; keep desk structure and singletons aligned with schema reality.
3. **Typed GROQ** — prefer `defineQuery` and generated types via TypeGen over untyped string queries and manual interfaces.
4. **References over denormalization** — model relationships with `reference` fields; resolve with GROQ projections. Let Sanity generate ordinary document `_id`s; use explicit IDs mainly for Studio-controlled singletons.
5. **Next.js integration** — fetch on the server by default in `apps/website`. Use the skill’s Next.js guidance for Live Content API, draft/preview, and Visual Editing rather than inventing a parallel data layer.
6. **Portable Text and images** — render PT through shared components; use the Sanity image pipeline / Next image patterns from the skill (`references/image.md`, `references/portable-text.md`).
7. **No production video on Sanity file assets** — use Mux / Media Library / external hosts per the skill’s video rules.
8. **Validate in both apps** — after schema changes, ensure Studio still loads and website queries/types still build (`turbo` filtered tasks as needed).
9. **Sanity is for dynamic content only** — the home page, classroom pages, photos, the calendar, the FAQs (questions and answers), and lists of names (teachers, volunteers). Everything else (policy-style pages, official documents, forms) is static content in `apps/website/app/lib/*-content.ts` or `apps/website/public/`; do not add Sanity schemas, queries or Studio entries for it unless asked. For Sanity-backed content, the website reads published documents and never substitutes stand-in content in code; an empty result renders an empty state.

## SEO

Load `.agents/skills/seo-aeo-best-practices/SKILL.md` (references: `technical-seo.md`, `structured-data.md`, `eeat-principles.md`, `aeo-considerations.md`). When metadata is CMS-driven, also load `sanity-best-practices` -> `references/seo.md`.
1. Every public route exposes metadata through Next.js App Router patterns (`metadata` / `generateMetadata`), not ad-hoc `<head>` tags.
2. Prefer canonical, absolute URLs consistent with the production domain when emitting OG/canonical/JSON-LD.
3. Structured data must match visible content; do not mark up content that is not on the page.
4. If SEO fields live in Sanity, add/adjust them in `packages/schemas`, edit them in Studio, query them explicitly, and map them into `generateMetadata` / JSON-LD on the website.
5. Keep `sitemap` and `robots` generated from the real route inventory—avoid hand-maintained stale path lists.
6. After SEO changes, check title/description uniqueness, canonical targets, and that JSON-LD parses as valid structured data.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
