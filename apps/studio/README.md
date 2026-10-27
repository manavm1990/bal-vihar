# Bal Vihar Sanity Studio

CMS app for photos, home announcements, and calendar events.

## Develop

```bash
# from repo root
bun install
bun run --filter @bv/studio dev
```

Studio: `http://localhost:3333`
Website: `bun run --filter @bv/website dev` → `http://localhost:3000`

## Deploy

`bun run --filter @bv/studio deploy`

- Project: `x5wq3sbt` / dataset `production`
- Preview origin defaults to `https://balviharstlouis.org` (override with `SANITY_STUDIO_PREVIEW_ORIGIN` for local or Vercel)
- Website needs `SANITY_API_READ_TOKEN` (Viewer) for draft preview; set `NEXT_PUBLIC_SANITY_STUDIO_URL` to the deployed Studio URL
- Add the website origin to Sanity CORS with credentials

Editor workflow lives in Studio (desk labels + field help), not this file.

## Photo galleries

Photo galleries show only on `/photos`. Editors add photos two ways:

- Select all the photos in a folder (Cmd/Ctrl+A) and drag them onto the gallery's Photos list.
- Paste one picture link per line into "Add photos from links" and click Publish. A Sanity
  Function fetches the links, so the photos appear a minute or so later. "Last link import" says
  what was added or skipped.

The Function is `functions/import-photo-links`, configured by `sanity.blueprint.ts` at the repo
root. It is deployed by hand, like the Studio (no CI token). From the repo root:

```bash
bunx sanity blueprints init .   # once, to create the Stack for project x5wq3sbt
bunx sanity blueprints plan     # preview what a deploy would change
bunx sanity blueprints deploy   # after changing the Function
bunx sanity functions logs import-photo-links
```

To try it without writing anything, point it at a published gallery that has links pasted:

```bash
bunx sanity functions test import-photo-links --document-id <gallery id> --dataset production --with-user-token
```
