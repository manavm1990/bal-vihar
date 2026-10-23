/**
 * Creates the class pages that do not exist yet, then gives Art sample content so the pages have
 * something to show. Safe to re-run: classes are matched by slug, drafts included, existing
 * documents are never touched, and Art is only filled while it is still empty.
 *
 *   bun run seed:class-pages           # dry run, lists what would change
 *   bun run seed:class-pages --write   # makes the changes
 */
import { getCliClient } from "sanity/cli";

type Client = ReturnType<typeof getCliClient>;

const API_VERSION = "2025-01-01";
const SHOULD_WRITE = process.argv.includes("--write");

const CLASSES = [
  { title: "K-1", slug: "k-1", group: "grade", sortOrder: 10 },
  { title: "1-A", slug: "1-a", group: "grade", sortOrder: 20 },
  { title: "2-A", slug: "2-a", group: "grade", sortOrder: 30 },
  { title: "3-A", slug: "3-a", group: "grade", sortOrder: 40 },
  { title: "4-A", slug: "4-a", group: "grade", sortOrder: 50 },
  { title: "5-A", slug: "5-a", group: "grade", sortOrder: 60 },
  { title: "6-A", slug: "6-a", group: "grade", sortOrder: 70 },
  { title: "7-A", slug: "7-a", group: "grade", sortOrder: 80 },
  { title: "Y1", slug: "y1", group: "youth", sortOrder: 110 },
  { title: "Y2", slug: "y2", group: "youth", sortOrder: 120 },
  { title: "Y3", slug: "y3", group: "youth", sortOrder: 130 },
  { title: "Y4", slug: "y4", group: "youth", sortOrder: 140 },
  { title: "Art", slug: "art", group: "enrichment", sortOrder: 210 },
  { title: "Bhajan", slug: "bhajan", group: "enrichment", sortOrder: 220 },
  { title: "Yoga", slug: "yoga", group: "enrichment", sortOrder: 230 },
  { title: "Community Projects", slug: "community-projects", group: "other", sortOrder: 310 },
  {
    title: "Feature Articles/Essays",
    slug: "feature-articles-essays",
    group: "other",
    sortOrder: 320,
  },
];

/** Sample content, labelled as such, so editors know to replace it. No teacher names on purpose. */
const ART_SAMPLE = {
  pinnedNote:
    "Sample content while this class page is being set up. Teachers will replace it after the next class.",
  links: [
    {
      _key: "calendar",
      _type: "classLink",
      label: "Bal Vihar calendar",
      url: "https://balviharstlouis.org/calendar",
    },
  ],
  sessions: [
    {
      _key: "session-2026-10-18",
      _type: "classSession",
      date: "2026-10-18",
      covered:
        "Warm-up sketching, then we started rangoli patterns: symmetry, repeating shapes and mixing colors.",
      homework:
        "Sketch one rangoli design at home using three colors and bring it to the next class.",
    },
    {
      _key: "session-2026-10-04",
      _type: "classSession",
      date: "2026-10-04",
      covered:
        "A look at this year's art projects and materials. Everyone drew a favorite festival scene.",
    },
  ],
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

async function addArtSample(client: Client) {
  // Published copy only: a draft is a teacher's work in progress.
  const art = await client.fetch<{ _id: string; hasContent: boolean } | null>(
    `*[_type == "classPage" && slug.current == "art" && !(_id in path("drafts.**"))][0]{
      _id,
      "hasContent": count(sessions) > 0 || count(links) > 0 || defined(pinnedNote)
    }`,
  );

  if (!art || art.hasContent) {
    console.log(
      `Art sample content: skipped, ${art ? "Art already has content" : "the Art class page does not exist yet"}.`,
    );
    return;
  }

  console.log(
    `Art sample content: a pinned note, ${ART_SAMPLE.links.length} link and ${ART_SAMPLE.sessions.length} sessions${SHOULD_WRITE ? "" : " (dry run)"}.`,
  );
  if (SHOULD_WRITE) await client.patch(art._id).set(ART_SAMPLE).commit();
}

async function createMissingClasses(client: Client) {
  const existingSlugs = new Set(
    await client.fetch<string[]>(`*[_type == "classPage" && defined(slug.current)].slug.current`),
  );
  const missing = CLASSES.filter((item) => !existingSlugs.has(item.slug));

  console.log(
    `${existingSlugs.size} class pages exist, ${missing.length} missing${SHOULD_WRITE ? "" : " (dry run)"}.`,
  );
  for (const item of missing) console.log(`  + ${item.title} (${item.slug})`);

  if (missing.length === 0 || !SHOULD_WRITE) return;

  // No _id on purpose: Sanity generates ids for ordinary documents.
  const transaction = missing.reduce(
    (tx, item) =>
      tx.create({
        _type: "classPage",
        title: item.title,
        slug: { _type: "slug", current: item.slug },
        group: item.group,
        sortOrder: item.sortOrder,
      }),
    client.transaction(),
  );

  await transaction.commit();
  console.log(`Created ${missing.length} class pages.`);
}

async function main() {
  // "raw" also sees drafts, so a class a teacher already started is never created twice.
  const client = getCliClient({ apiVersion: API_VERSION }).withConfig({ perspective: "raw" });

  await createMissingClasses(client);
  await addArtSample(client);
}
