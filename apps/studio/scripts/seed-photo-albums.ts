/**
 * One-off: turns each photo in the old "Home & page photos" list into a one-photo gallery, so the
 * Photos page isn't empty when galleries launch. The old list is not touched, because the home
 * strip and the page banners still read it.
 *
 * Run from apps/studio, signed in with `bunx sanity login`. Try a dry run first, which changes
 * nothing and only prints what it would do:
 *   bunx sanity exec scripts/seed-photo-albums.ts --with-user-token -- --dry-run
 * Then for real:
 *   bunx sanity exec scripts/seed-photo-albums.ts --with-user-token
 *
 * Safe to run twice: a gallery whose web address already exists is skipped.
 */
import { getCliClient } from "sanity/cli";

interface OldPhoto {
  _key: string;
  title?: string;
  schoolYear?: string;
  image: {
    asset: { _ref: string };
    alt?: string;
    caption?: string;
    hotspot?: Record<string, unknown>;
    crop?: Record<string, unknown>;
  };
}

const DRY_RUN = process.argv.includes("--dry-run");

async function seedPhotoAlbums() {
  const client = getCliClient({ apiVersion: "2025-01-01", perspective: "raw" });
  const photos = await client.fetch<OldPhoto[] | null>(
    '*[_id == "photoGallery"][0].photos[defined(image.asset)]{ _key, title, schoolYear, image }',
  );
  console.log(
    `${photos?.length ?? 0} photos found${DRY_RUN ? " (dry run: nothing will change)" : ""}.`,
  );

  let created = 0;
  for (const photo of photos ?? []) {
    const title = photo.title?.trim();
    const slug = title ? createSlug(title, photo.schoolYear) : "";
    if (!title || !slug) {
      console.log(`Skipping photo ${photo._key}: it has no name.`);
      continue;
    }

    const exists = await client.fetch<boolean>(
      'count(*[_type == "photoAlbum" && slug.current == $slug]) > 0',
      { slug },
    );
    if (exists) {
      console.log(`Skipping "${title}": /photos/${slug} already exists.`);
      continue;
    }

    console.log(`${DRY_RUN ? "Would create" : "Creating"} "${title}" at /photos/${slug}.`);
    created += 1;
    if (DRY_RUN) continue;

    const { image } = photo;
    await client.create({
      _type: "photoAlbum",
      title,
      slug: { _type: "slug", current: slug },
      schoolYear: photo.schoolYear,
      photos: [
        {
          _type: "albumPhoto",
          _key: photo._key,
          asset: { _type: "reference", _ref: image.asset._ref },
          alt: image.alt,
          caption: image.caption,
          hotspot: image.hotspot,
          crop: image.crop,
        },
      ],
    });
  }

  console.log(`${created} galleries ${DRY_RUN ? "would be created" : "created"}.`);
}

/** "Diwali" + "2015" gives "diwali-2015". A year like "Recent" is left out of the address. */
const createSlug = (title: string, schoolYear?: string) =>
  [title, schoolYear && /^\d/.test(schoolYear) ? schoolYear : null]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

seedPhotoAlbums().catch((error: unknown) => {
  console.error("Could not create the photo galleries", error);
  process.exit(1);
});
