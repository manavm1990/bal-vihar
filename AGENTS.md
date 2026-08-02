# AGENTS.md

This file is the canonical source of AI agent instructions for this repository.
If tool-specific instruction files exist, they should defer to this file.

## Project Overview

This is **Bal Vihar of St. Louis**, a Turborepo monorepo containing a Next.js 16 website and Sanity Studio CMS for the Center for Indian Cultural Education. It's a community organization website that teaches Indian culture and values to children through various events and activities.

## Monorepo Architecture

### Project Structure

```
bal-vihar/
├── apps/
│   ├── website/          # Next.js 16 public website
│   └── studio/           # Sanity Studio CMS
├── packages/
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── schemas/          # Shared Sanity schemas and types
├── turbo.json           # Turborepo configuration
└── package.json         # Root workspace configuration
```

- **Turborepo**: Monorepo build system with caching and task orchestration
- **Apps**: Website (Next.js 16) and Studio (Sanity CMS) run independently
- **Shared Packages**: Common configurations and schemas across apps
- **Build System**: Bun package manager with workspace support

### Key Directories

- `apps/website/app/components/ui/` - Reusable UI components (buttons, forms, typography, etc.)
- `apps/website/app/lib/` - Utility functions, constants, and type definitions
- `apps/website/app/(home)/` - Homepage with hero carousel
- `apps/studio/` - Sanity Studio for content management
- `packages/schemas/` - Shared content schemas and TypeScript types

### Component Architecture

- **Typography System**: Comprehensive typography components in `app/components/ui/typography/`
- **Form Handling**: React Hook Form with Valibot validation
- **Icons**: Custom icon components in `app/components/ui/icons/`
- **Navigation**: Multi-level navigation system with mobile/desktop variants

### Path Aliases

```typescript
// Available TypeScript path aliases (apps/website/)
"@components/*" -> "./app/components/*"
"@lib/*" -> "./app/lib/*"
"@types/*" -> "./app/types/*"

// Workspace packages
"@bv/typescript-config" -> "../../packages/typescript-config"
"@bv/schemas" -> "../../packages/schemas"
```

### State Management & Data

- **Server Actions**: Uses Next.js server actions for form submissions (`'use server'`)
- **Email Integration**: Resend integration configured (TODO: domain setup required)
- **Schema Validation**: Valibot for runtime type validation

### Styling Approach

- **Utility-First**: Tailwind CSS with custom configuration
- **Design Tokens**: CSS custom properties with font variables
- **Component Variants**: Uses `class-variance-authority` for component variants
- **Responsive**: Mobile-first responsive design

## Code Quality & Standards

### TypeScript Configuration

- Strict type checking enabled with additional safety rules
- `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`
- Module resolution set to `"bundler"` for modern tooling
- Shared base config in `@bv/typescript-config` package

### Key Development Practices

- **Accessibility**: Comprehensive JSX accessibility rules enforced
- **Type Safety**: Strict TypeScript with no `any` types allowed
- **Import Management**: Enforced import ordering and cycle detection
- **Encapsulation**: Custom hooks encouraged over direct hook usage in components
- **Monorepo Linting**: Biome is used for unified linting and formatting across packages
- **Pre-commit Hooks**: lint-staged runs Biome checks on staged TypeScript files

## Environment & Dependencies

### Core Stack

- Next.js 16 with App Router and Turbopack
- React 19 with React Hook Form
- TypeScript with strict configuration
- Tailwind CSS v4 with PostCSS

### Notable Dependencies

- **UI**: Radix UI primitives for accessible components
- **Animation**: Framer Motion (`motion` package)
- **Email**: React Email components and Resend
- **Validation**: Valibot for schema validation
- **Carousel**: Embla Carousel with autoplay

## Navigation Structure

The site uses a comprehensive multi-level navigation system defined in `app/components/header/navs/constants.ts`:

- About Us (History, Admin Team, Policies)
- Admissions (Process, Tuition, Refund Policy)
- Education (Curriculum K-7, Youth Group, Class Pages)
- News & Events
- Resources (Parents, Students, Faculty, Admin)
- Giving (Online giving, Matching gifts, Sponsors)
- Volunteering (Opportunities, Applications, Policies)
- Community Projects (CANstruction, Drives, Cultural events)

## Form Handling Pattern

Forms use a consistent pattern:

1. Valibot schema definition for validation
2. React Hook Form for form state management
3. Server actions for form submission
4. Type-safe form inputs with `ContactFormInputs` pattern

## Frontend UI Engineering Standards

- Build production-quality UI with existing design tokens and Tailwind utility classes; avoid inline styles and arbitrary one-off spacing values.
- Follow semantic structure and accessibility-first patterns: keyboard accessible interactions, associated form labels, proper heading hierarchy, and meaningful empty/error/loading states.
- Prefer composition over over-configured components and separate data-loading/container concerns from presentational components.
- Use mobile-first responsive behavior and verify layouts across common breakpoints.
- Keep component state minimal and local by default; extract custom hooks when behavior grows complex.
- Use established component library for UI components.
- Do not introduce custom CSS unless absolutely necessary.

## Agent Skills Map

Project skills live in `.agents/skills/` and are locked in `skills-lock.json`. Read the matching `SKILL.md` (and only the needed `references/` files) before doing work in that domain. Do not reinstall or broaden the skill set unless explicitly asked.

| Skill | Use when |
| --- | --- |
| `sanity-best-practices` | Schemas (`defineType` / `defineField`), GROQ / `defineQuery`, TypeGen, Portable Text, images, Studio structure, Visual Editing, Sanity + Next.js integration, Functions/Blueprints |
| `seo-aeo-best-practices` | Page/metadata SEO, Open Graph, sitemaps, `robots.txt`, JSON-LD, EEAT, AI-answer (AEO) readiness |
| `turborepo` | `turbo.json`, pipelines, caching, `--filter` / `--affected`, internal packages, monorepo task wiring |
| `frontend-ui-engineering` | Building or changing user-facing UI, layouts, accessibility, component state |
| `frontend-design` | New or reshaped visual design, typography, distinctive aesthetic direction |
| `vercel-composition-patterns` | Compound components, boolean-prop cleanup, flexible component APIs, React 19 composition patterns |
| `web-design-guidelines` | UI/UX accessibility or interface-guideline audits |
| `code-review-and-quality` | Before merge; multi-axis review of agent or human changes |

Routing rules:

- Prefer the single most specific skill first; load a second skill only when the task truly crosses domains.
- Sanity content modeling and Studio work → `sanity-best-practices` (not ad-hoc schema guesses).
- Any public page SEO/metadata/structured data work → `seo-aeo-best-practices` (see SEO routing below).
- Monorepo/build/package work → `turborepo`.
- UI implementation → `frontend-ui-engineering`; visual identity/direction → `frontend-design`; component API shape → `vercel-composition-patterns`.
- Finish non-trivial changes with `code-review-and-quality` before calling the work done.

## Sanity Workflow

This monorepo splits Sanity concerns intentionally:

- Shared schemas/types: `packages/schemas`
- Studio app: `apps/studio`
- Public site consumption: `apps/website` (Next.js App Router)

When working with Sanity, follow `.agents/skills/sanity-best-practices/SKILL.md` and load only the relevant reference guides (usually `references/schema.md`, `references/groq.md`, and/or `references/nextjs.md`).

### Required practices

1. **Schemas first in the shared package** — define or change document/object types in `packages/schemas`, not duplicated inside the website app.
2. **Studio follows shared schemas** — wire Studio structure/plugins in `apps/studio`; keep desk structure and singletons aligned with schema reality.
3. **Typed GROQ** — prefer `defineQuery` and generated types via TypeGen over untyped string queries and manual interfaces.
4. **References over denormalization** — model relationships with `reference` fields; resolve with GROQ projections. Let Sanity generate ordinary document `_id`s; use explicit IDs mainly for Studio-controlled singletons.
5. **Next.js integration** — fetch on the server by default in `apps/website`. Use the skill’s Next.js guidance for Live Content API, draft/preview, and Visual Editing rather than inventing a parallel data layer.
6. **Portable Text and images** — render PT through shared components; use the Sanity image pipeline / Next image patterns from the skill (`references/image.md`, `references/portable-text.md`).
7. **No production video on Sanity file assets** — use Mux / Media Library / external hosts per the skill’s video rules.
8. **Validate in both apps** — after schema changes, ensure Studio still loads and website queries/types still build (`turbo` filtered tasks as needed).

### Typical change sequence

1. Read `sanity-best-practices` + the one or two needed references.
2. Update schema in `packages/schemas`.
3. Update Studio structure/inputs if authors need new editing UX.
4. Update GROQ/queries and website rendering in `apps/website`.
5. Regenerate or refresh TypeGen types if the project’s typegen workflow requires it.
6. Smoke-check Studio + website, then review with `code-review-and-quality`.

## SEO Routing Instructions

SEO/AEO work is skill-routed, not improvised.

### When to load which skill

- **Default for site-wide or page SEO:** `.agents/skills/seo-aeo-best-practices/SKILL.md`
  - Metadata / `generateMetadata`, titles, descriptions
  - Open Graph / Twitter cards
  - `sitemap` / `robots.txt`
  - JSON-LD structured data
  - EEAT and AI-answer (AEO) readiness
  - Use references as needed: `technical-seo.md`, `structured-data.md`, `eeat-principles.md`, `aeo-considerations.md`
- **Also load Sanity SEO guidance when metadata is CMS-driven:** `sanity-best-practices` → `references/seo.md` (and schema/GROQ refs if fields or queries change).
- **UI that affects crawlability or semantics** (heading order, empty states, link text, accessible names): still implement via `frontend-ui-engineering`, but verify SEO implications with `seo-aeo-best-practices`.

### Implementation rules for this repo

1. Every public route should expose correct metadata through Next.js App Router patterns (`metadata` / `generateMetadata`), not ad-hoc `<head>` tags.
2. Prefer canonical, absolute URLs consistent with the production domain when emitting OG/canonical/JSON-LD.
3. Structured data must match visible content; do not mark up content that is not on the page.
4. If SEO fields live in Sanity, add/adjust them in `packages/schemas`, edit them in Studio, query them explicitly, and map them into `generateMetadata` / JSON-LD on the website.
5. Technical artifacts (`sitemap`, `robots`) should stay generated from the real route inventory where possible—avoid hand-maintained stale path lists.
6. After SEO changes, sanity-check title/description uniqueness, canonical targets, and that JSON-LD parses as valid structured data.
