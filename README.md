# Bal Vihar of St. Louis

A modern Turborepo monorepo for the Center for Indian Cultural Education, containing a Next.js 16 website and Sanity Studio CMS.

## 🏗️ Monorepo Architecture

```
bal-vihar/
├── apps/
│   ├── website/          # Next.js 16 public website (localhost:3000)
│   └── studio/           # Sanity Studio CMS (localhost:3333)
├── packages/
│   ├── eslint-config/    # Shared ESLint configuration (@bv/eslint-config)
│   ├── typescript-config/ # Shared TypeScript configuration (@bv/typescript-config)
│   └── schemas/          # Shared Sanity schemas and types (@bv/schemas)
├── turbo.json           # Turborepo configuration
└── package.json         # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20.9+
- **Bun** 1.0+ (package manager)

### Development

```bash
# Install dependencies
bun install

# Start both website and studio
turbo dev

# Start only the website (Next.js)
turbo dev --filter=@bv/website

# Start only the studio (Sanity)
turbo dev --filter=@bv/studio
```

### Build & Deploy

```bash
# Build all packages
turbo build

# Lint all packages
turbo lint

# Build specific packages
turbo build --filter=@bv/website
```

## 📦 Packages

### Apps

- **`@bv/website`** - Next.js 16 application with App Router, TypeScript, and Tailwind CSS
- **`@bv/studio`** - Sanity Studio for content management

### Shared Packages

- **`@bv/eslint-config`** - Shared ESLint configuration with TypeScript and accessibility rules
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
- **ESLint** - Code linting with shared configurations
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **lint-staged** - Pre-commit linting and formatting

## 🎯 Key Features

- **🏃‍♂️ Fast Development** - Turborepo caching and parallel execution
- **📝 Content Management** - Sanity Studio with custom schemas
- **🔒 Type Safety** - Strict TypeScript across all packages
- **♿ Accessibility** - WCAG compliant with comprehensive a11y rules
- **🎨 Modern UI** - Tailwind CSS v4 with Radix UI primitives
- **📱 Responsive Design** - Mobile-first approach

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `turbo dev` | Start both website and studio |
| `turbo dev --filter=@bv/website` | Start only Next.js website |
| `turbo dev --filter=@bv/studio` | Start only Sanity Studio |
| `turbo build` | Build all packages |
| `turbo lint` | Lint all packages |
| `bun install` | Install dependencies |

## 🌐 Local Development

- **Website**: [http://localhost:3000](http://localhost:3000)
- **Studio**: [http://localhost:3333](http://localhost:3333)

## 📚 Documentation

- **Development Guide**: See `WARP.md` for detailed development instructions
- **Website Docs**: `apps/website/README.md`
- **Studio Docs**: `apps/studio/README.md` (if available)

## 🤝 Contributing

1. Install dependencies: `bun install`
2. Start development: `turbo dev`
3. Make changes and ensure `turbo lint` passes
4. Pre-commit hooks will automatically lint and format your code

## 📄 License

Private repository for Bal Vihar of St. Louis.