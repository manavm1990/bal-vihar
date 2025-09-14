# Project Overview

This is **Bal Vihar of St. Louis**, a Next.js 15 application for the Center for Indian Cultural Education. It's a community organization website that teaches Indian culture and values to children through various events and activities.

## Folder Structure

- `app/components/ui/` - Reusable UI components (buttons, forms, typography, etc.)
- `app/lib/` - Utility functions, constants, and type definitions
- `app/(home)/` - Homepage with hero carousel
- Route-based pages follow the App Router file-based routing convention
- `public/` - Static assets like images, fonts, and icons

## Libraries and Frameworks

- Next.js 15 with App Router
- React 19
- Tailwind CSS v4 with Radix UI primitives
- TypeScript with strict configuration
- React Hook Form for form state management
- Valibot for schema validation
- Resend for email integration
- Sanity.io for CMS (headless content management)

## Coding Standards

- Strict type checking enabled with additional safety rules
- `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`
- Module resolution set to "bundler" for modern tooling

## UI guidelines

- Application should have a modern and clean design.
- Use consistent spacing and layout throughout the application.
- Ensure all interactive elements are easily accessible and usable on both desktop and mobile devices.
- Follow the established design system and component library for all UI elements.
- Use Tailwind CSS utility classes for styling, avoiding custom CSS where possible.
