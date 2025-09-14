# CLAUDE.md

This file provides guidance to Anthropic's Claude AI when working with code in this repository.

## Project Overview

This is **Bal Vihar of St. Louis**, a Next.js 15 application for the Center for Indian Cultural Education. It's a community organization website that teaches Indian culture and values to children through various events and activities.

## Code Architecture

### Project Structure

- **App Router Architecture**: Uses Next.js 15 App Router with the `app/` directory
- **TypeScript**: Strict TypeScript configuration with comprehensive type safety rules
- **Styling**: Tailwind CSS v4 with custom design system using Radix UI primitives
- **State Management**: Server actions for form submissions, React Hook Form for form state
- **UI Components**: Custom component library in `app/components/ui/`

### Key Directories

- `app/components/ui/` - Reusable UI components (buttons, forms, typography, etc.)
- `app/lib/` - Utility functions, constants, and type definitions
- `app/(home)/` - Homepage with hero carousel
- Route-based pages follow the App Router file-based routing convention

### Component Architecture

- **Typography System**: Comprehensive typography components in `app/components/ui/typography/`
- **Form Handling**: React Hook Form with Valibot validation
- **Icons**: Custom icon components in `app/components/ui/icons/`
- **Navigation**: Multi-level navigation system with mobile/desktop variants

### Path Aliases

```typescript
// Available TypeScript path aliases
"@components/*" -> "./app/components/*"
"@lib/*" -> "./app/lib/*"
"@types/*" -> "./app/types/*"
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

### Key Development Practices

- **Accessibility**: Comprehensive JSX accessibility rules enforced
- **Type Safety**: Strict TypeScript with no `any` types allowed
- **Import Management**: Enforced import ordering and cycle detection
- **Encapsulation**: Custom hooks encouraged over direct hook usage in components

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
