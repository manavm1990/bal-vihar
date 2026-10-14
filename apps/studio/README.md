# Bal Vihar Sanity Studio

Content admin for what actually changes on the site.

## Run locally

```bash
# from repo root
bun install
bun run --filter @bv/studio dev
```

Studio: http://localhost:3333  
Website (separate terminal): `bun run --filter @bv/website dev` → http://localhost:3000

## What to edit (in order)

| Desk item | Document | What it controls |
| --- | --- | --- |
| **Home Page** | singleton `homePage` | Hero carousel images, registration/cancellation announcements, optional “Who we are” blurb |
| **Photo Gallery** | singleton `photoGallery` | Community photos on the home board (`featured` toggle) |
| **Calendar Events** | `calendarEvent` documents | Class dates and special events on `/calendar` |
| **Site Settings** | singleton `siteSettings` | Registration URL, default OG image, contact email |

Everything else in the desk is optional / legacy and can be ignored.

## Photo workflow

1. Open **Photo Gallery**
2. Add a photo → upload image → set **alt** text (required for a11y)
3. Set title + school year
4. Leave **Featured on home** on to show it on `/`
5. **Publish**

Hero images live on **Home Page → Hero photos** (separate from the gallery board).

## Calendar workflow

1. Open **Calendar Events → Create**
2. Title, date, optional time/location/type
3. Turn on **Highlight** for featured items
4. Set academic year (e.g. `2025-26`)
5. **Publish**

## Announcement windows

On **Home Page → Announcements**:

- `isActive` must be on
- Optional `Show from` / `Show until` datetimes gate visibility (registration open windows, weather cancel banners)

## Project

- Project ID: `x5wq3sbt`
- Dataset: `production`

Invite editors in [Sanity Manage](https://www.sanity.io/manage) with the smallest role that can edit + publish.

## Deploy Studio

```bash
bun run --filter @bv/studio deploy
```
