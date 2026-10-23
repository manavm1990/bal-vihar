/**
 * Creates the class pages that do not exist yet. Safe to re-run: classes are matched by slug,
 * drafts included, and existing documents are never touched.
 *
 *   bun run seed:class-pages           # dry run, lists what would be created
 *   bun run seed:class-pages --write   # creates the missing documents
 */
import { getCliClient } from "sanity/cli";

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

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  // "raw" also sees drafts, so a class a teacher already started is never created twice.
  const client = getCliClient({ apiVersion: API_VERSION }).withConfig({ perspective: "raw" });

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
