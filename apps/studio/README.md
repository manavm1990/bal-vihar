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
| **Calendar Events** | `calendarEvent` documents | The next events on the home page and the full list on `/calendar` |
| **Home Page** | singleton `homePage` | Announcements (snow days, registration windows), optional "Who we are" blurb, optional hero photos |
| **Photo Gallery** | singleton `photoGallery` | The `/photos` page, plus photos marked **Featured** on the home page (only photos with an image show there) |
| **Site Settings** | singleton `siteSettings` | Registration URL, default OG image, contact email |

Everything else in the desk is optional / legacy and can be ignored.

## Home page priority

1. **Announcements** are for exceptions only. An empty list is correct: the home page then shows nothing there. There is no built-in fallback banner.
2. **Upcoming events** are the next 5 `calendarEvent` documents dated today or later, in date order. Nothing to configure; publish events and they appear.
3. **About, numbers and programs** are written into the site and do not need editing here. The "Who we are" blurb on Home Page overrides the intro text if filled in.
4. **Featured photos** (up to 6, with an image) show under "Around Bal Vihar" from the Photo Gallery.
5. **Hero photos** show only if you add slides under Home Page. With none, the carousel is hidden.

## Photo workflow

1. Open **Photo Gallery**
2. Add a photo, upload the image and set **alt** text (required for accessibility)
3. Set title and school year
4. Leave **Featured on home** on to show it on the home page
5. Optional: under **Show as banner on pages**, tick the pages where this photo should be the banner at the top (History, Community Outreach, Admissions, Education, Curriculum K-7, Volunteering). If several photos are ticked for a page, the first one in the list is used. A page with no ticked photo shows no banner.
6. **Publish**

## Calendar workflow

1. Open **Calendar Events → Create**
2. Title, date, optional time/location/type
3. Set academic year (e.g. `2026-27`)
4. **Publish**: it shows on `/calendar` and, once it is among the next 5, on the home page

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
