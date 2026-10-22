# Bal Vihar Sanity Studio

CMS app for photos, home announcements, and calendar events.

## Develop

```bash
# from repo root
bun install
bun run --filter @bv/studio dev
```

Studio: http://localhost:3333  
Website: `bun run --filter @bv/website dev` → http://localhost:3000

## Deploy

```bash
bun run --filter @bv/studio deploy
```

- Project: `x5wq3sbt` / dataset `production`
- Preview origin defaults to `https://balviharstlouis.org` (override with `SANITY_STUDIO_PREVIEW_ORIGIN` for local or Vercel)
- Website needs `SANITY_API_READ_TOKEN` (Viewer) for draft preview; set `NEXT_PUBLIC_SANITY_STUDIO_URL` to the deployed Studio URL
- Add the website origin to Sanity CORS with credentials

Editor workflow lives in Studio (desk labels + field help), not this file.
