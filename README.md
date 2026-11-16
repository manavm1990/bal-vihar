# Bal Vihar of St. Louis

A modern Turborepo monorepo for the Center for Indian Cultural Education, containing a Next.js 16 website and Sanity Studio CMS.

## 🏗️ Monorepo Architecture

```sh
bal-vihar/
├── apps/
│   ├── website/          # Next.js 16 public website (localhost:3000)
│   └── studio/           # Sanity Studio CMS (localhost:3333)
├── packages/
│   ├── typescript-config/ # Shared TypeScript configuration (@bv/typescript-config)
│   └── schemas/          # Shared Sanity schemas and types (@bv/schemas)
├── turbo.json           # Turborepo configuration
└── package.json         # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.9+
- **Bun** — **you must install this yourself first.** Nothing in this repo can install it for you, and `bun install` will not work without it. Use the version pinned in the `packageManager` field of `package.json` (currently 1.4.4).

```bash
# Install Bun (macOS / Linux)
curl -fsSL https://bun.sh/install | bash

# Or with Homebrew
brew install oven-sh/bun/bun

# Confirm it worked (open a new terminal first)
bun --version
```

Other platforms: [bun.sh/docs/installation](https://bun.sh/docs/installation).

Use Bun only to install and update dependencies (`bun install`, `bun update`). Run everything else through `turbo` (see below).

### Development

```bash
# Install dependencies
bun install

# Start both website and studio
npx turbo dev

# Start only the website (Next.js)
npx turbo dev --filter=@bv/website

# Start only the studio (Sanity)
npx turbo dev --filter=@bv/studio
```

### Build & Deploy

```bash
# Build all packages
npx turbo build

# Lint all packages
npx turbo lint

# Lint and auto-fix all packages
npx turbo lint:fix

# Build specific packages
npx turbo build --filter=@bv/website
```

## 📦 Packages

### Apps

- **`@bv/website`** - Next.js 16 application with App Router, TypeScript, and Tailwind CSS
- **`@bv/studio`** - Sanity Studio for content management

### Shared Packages

- **`@bv/typescript-config`** - Shared TypeScript configuration with strict settings
- **`@bv/schemas`** - Sanity content schemas and generated TypeScript types

## 🛠️ Tech Stack

### Core Technologies

- **Turborepo** - Monorepo build system with intelligent caching
- **Next.js 16** - React framework with App Router and Turbopack
- **Sanity Studio** - Headless CMS for content management
- **TypeScript** - Strict type checking across all packages
- **Bun** - Fast package manager and workspace support

### Development Tools

- **Biome** - Unified linting and formatting
- **Husky** - Git hooks (pre-commit Biome, commit-msg Commitlint, pre-push typegen/typecheck/test)
- **Commitlint** - Conventional commits (`commitlint.config.ts`)
- **lint-staged** - Pre-commit linting and formatting
- **skills** + `skills-lock.json` - Agent skills under `.agents/skills/` (updated on `bun install`)

## 🎯 Key Features

- **🏃‍♂️ Fast Development** - Turborepo caching and parallel execution
- **📝 Content Management** - Sanity Studio with custom schemas
- **🔒 Type Safety** - Strict TypeScript across all packages
- **♿ Accessibility** - WCAG compliant with comprehensive a11y rules
- **🎨 Modern UI** - Tailwind CSS v4 with Radix UI primitives
- **📱 Responsive Design** - Mobile-first approach

## 🔧 Development Commands

| Command                              | Description                    |
| ------------------------------------ | ------------------------------ |
| `npx turbo dev`                      | Start both website and studio  |
| `npx turbo dev --filter=@bv/website` | Start only Next.js website     |
| `npx turbo dev --filter=@bv/studio`  | Start only Sanity Studio       |
| `npx turbo build`                    | Build all packages             |
| `npx turbo lint`                     | Lint all packages              |
| `npx turbo lint:fix`                 | Lint and auto-fix all packages |
| `bun install`                        | Install dependencies           |

## 🌐 Local Development

- **Website**: [http://localhost:3000](http://localhost:3000)
- **Studio**: [http://localhost:3333](http://localhost:3333)

## 📚 Documentation

- **Development Guide**: See `AGENTS.md` for detailed development instructions
- **Website Docs**: `apps/website/README.md`
- **Studio Docs**: `apps/studio/README.md` (if available)

## 🤝 Contributing

1. Install [Bun](https://bun.sh/docs/installation) yourself (see Prerequisites), then `bun install` (also refreshes agent skills; commit lock/skill churn if it appears)
2. Code changes go through the maintainer; content goes in Sanity Studio. If invited to change code: clone (never fork), branch off `main`, open a PR, never push to `main`. Full guide: `CONTRIBUTING.md`
3. Use conventional commits: `type(scope?): subject` (allowed scopes: `commitlint.config.ts`)
4. Pre-commit runs Biome via lint-staged; commit-msg runs Commitlint; pre-push runs Sanity typegen drift, then typecheck and tests for changed packages only (`turbo --filter`)
5. CI must be green; default reviewer is via `.github/CODEOWNERS`
6. See `AGENTS.md` for coding standards, Sanity typegen (`apps/studio/sanity.cli.ts`), and MCP (`.mcp.json`)
