# CLAUDE.md

This file provides guidance to Anthropic's Claude AI when working with code in this repository.

## Project Overview

This is **Bal Vihar of St. Louis**, a Turborepo monorepo containing a Next.js 15 website and Sanity Studio CMS for the Center for Indian Cultural Education. It's a community organization website that teaches Indian culture and values to children through various events and activities.

## Monorepo Architecture

### Project Structure

```
bal-vihar/
├── apps/
│   ├── website/          # Next.js 15 public website
│   └── studio/           # Sanity Studio CMS
├── packages/
│   ├── eslint-config/    # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── schemas/          # Shared Sanity schemas and types
├── turbo.json           # Turborepo configuration
└── package.json         # Root workspace configuration
```

- **Turborepo**: Monorepo build system with caching and task orchestration
- **Apps**: Website (Next.js 15) and Studio (Sanity CMS) run independently
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
"@bv/eslint-config" -> "../../packages/eslint-config"
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
- Module resolution set to "bundler" for modern tooling
- Shared base config in `@bv/typescript-config` package

### Key Development Practices

- **Accessibility**: Comprehensive JSX accessibility rules enforced
- **Type Safety**: Strict TypeScript with no `any` types allowed
- **Import Management**: Enforced import ordering and cycle detection
- **Encapsulation**: Custom hooks encouraged over direct hook usage in components
- **Monorepo Linting**: Per-package ESLint configurations with shared base rules
- **Pre-commit Hooks**: lint-staged runs ESLint and Prettier on staged files

## Environment & Dependencies

### Core Stack

- Next.js 15 with App Router and Turbopack
- React 19 with React Hook Form
- TypeScript with strict configuration
- Tailwind CSS v4 with PostCSS

### Notable Dependencies

- **UI**: Radix UI primitives for accessible components
- **Animation**: Framer Motion ("motion" package)
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
