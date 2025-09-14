# Bal Vihar of St. Louis — Copilot Instructions

This repository is a Turborepo monorepo for the Bal Vihar of St. Louis community website and CMS.

## Minimal Project Overview

- **Monorepo**: Turborepo with Bun package manager
- **Apps**:
  - `apps/website/`: Next.js 15 public website (App Router, React 19, Tailwind CSS v4, TypeScript strict)
  - `apps/studio/`: Sanity Studio CMS (content management)
- **Shared Packages**:
  - `packages/schemas/`: Shared Sanity schemas and types
  - `packages/eslint-config/`, `packages/typescript-config/`: Shared config

## Key Directories (for code editing)

- `apps/website/app/components/ui/` — Reusable UI components (buttons, forms, typography, icons, etc.)
- `apps/website/app/lib/` — Utility functions, constants, and types
- `apps/website/app/(home)/` — Homepage (hero carousel)
- `apps/website/app/` — Route-based pages (App Router convention)
- `apps/website/public/` — Static assets
- `apps/studio/` — Sanity Studio config and schemaTypes
- `packages/schemas/` — Shared content schemas and types

## Core Libraries & Patterns

- **Next.js 15** (App Router, server actions)
- **React 19**
- **Tailwind CSS v4** (utility-first, no custom CSS preferred)
- **Radix UI** primitives
- **TypeScript** (strict, no `any`, strict config, shared base config)
- **React Hook Form** + **Valibot** (form state & validation)
- **Sanity.io** (CMS)
- **Resend** (email integration)
- **Framer Motion** (animation)
- **Embla Carousel** (carousel)

## Coding & UI Standards

- Strict TypeScript: `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`, strictest settings
- Shared configs via workspace packages
- Accessibility: JSX a11y rules enforced
- No `any` types allowed
- Import order and cycle detection enforced
- Prefer custom hooks for logic reuse
- Linting: Per-package ESLint, Prettier, lint-staged pre-commit
- Use Tailwind utility classes for all styling
- Responsive, mobile-first design
- Use established component library for all UI

## Path Aliases (website app)

- `@components/*` → `./app/components/*`
- `@lib/*` → `./app/lib/*`
- `@types/*` → `./app/types/*`
- `@bv/eslint-config`, `@bv/typescript-config`, `@bv/schemas` → workspace packages

## Form Handling Pattern

1. Define Valibot schema for validation
2. Use React Hook Form for state
3. Use server actions for submission
4. Type-safe form inputs (e.g., `ContactFormInputs`)

## Navigation Structure

Multi-level navigation defined in `app/components/header/navs/constants.ts` (About Us, Admissions, Education, News, Resources, Giving, Volunteering, Community Projects, etc.)

## For Copilot

- Focus on code generation, bug fixing, and editing in the above directories.
- Use the established patterns and strict TypeScript.
- Use Tailwind utility classes for all styling.
- Do not introduce custom CSS unless absolutely necessary.
- Use shared configs and types from workspace packages.
- All code should be accessible and responsive.
