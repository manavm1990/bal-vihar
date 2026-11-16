# Contributing

**Code changes go through the maintainer (@manavm1990).** If you want something changed on the site, tell them what and why; they will make the change. Please do not edit code unless they have asked you to.

**Pull requests from forks are closed without review.** Use the provided tooling: clone this repository, install with Bun, and let the Husky hooks and `turbo` run. Work that skips them (forks, `--no-verify`, editing in the GitHub web editor) will not be merged.

## What goes where

| You want to change                                                              | How                                                                                       |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Calendar, classes, photos, FAQs, teacher and volunteer lists, home page notices | **Sanity Studio**. Content only, no code, no pull request. Ask the maintainer for access. |
| Anything else: wording on policy pages, forms, documents, layout, features      | Send the maintainer the request. They make the change.                                    |

## If the maintainer has asked you to make a code change

1. Install [Node.js](https://nodejs.org) 20.9+ and [Bun](https://bun.sh/docs/installation). Nothing in this repo can install Bun for you; check with `bun --version` (required version: `packageManager` in `package.json`).
2. **Clone this repository. Do not fork.** Then run `bun install`. Bun is used only for `bun install` and `bun update`; everything else runs through `turbo`.
3. `git switch main && git pull`, then `git switch -c your-branch-name`.
4. Run the site while you work: `turbo run dev --filter=@bv/website` (or `--filter=@bv/studio`).
5. Commit with a message like `feat(website): add volunteer page`. Allowed scopes are in `commitlint.config.ts`. Lint runs only on the files you staged.
6. Push. Type generation and type checks run for the packages you changed. If generated files changed, commit `apps/studio/schema.json` and `apps/website/sanity.types.ts` and push again.
7. Open a pull request into `main`. CI must be green and the maintainer must approve it. Only the maintainer can merge into `main`.

You can see your change before it merges, either with the Vercel preview deployment on your pull request (if one appears) or locally with `turbo run dev --filter=@bv/website`.

Never use `--no-verify`, commit secrets, or mix unrelated changes in one pull request. Read `AGENTS.md` first; AI assistants must follow it too. If CI is red, open the failed step in GitHub Actions and ask the maintainer if it is unclear.
