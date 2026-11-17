import { readdirSync } from "node:fs";
import { basename, join, sep } from "node:path";
import { getCachedNow } from "@lib/clock";
import { SITE_URL } from "@lib/constants";
import { client } from "@lib/sanity/client";
import { getCurrentPages } from "@lib/sanity/pages";
import {
  CALENDAR_EVENTS_QUERY,
  CLASS_PAGES_QUERY,
  PAGES_QUERY,
  PHOTO_ALBUMS_QUERY,
} from "@lib/sanity/queries";
import type { MetadataRoute } from "next";

const APP_DIR = join(process.cwd(), "app");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [classPages, events, albums, pages, now] = await Promise.all([
    client.fetch(CLASS_PAGES_QUERY),
    client.fetch(CALENDAR_EVENTS_QUERY),
    client.fetch(PHOTO_ALBUMS_QUERY),
    client.fetch(PAGES_QUERY),
    getCachedNow(),
  ]);
  const classRoutes = classPages.flatMap(({ slug }) =>
    slug ? [`/education/classes/${slug}`] : [],
  );

  const pageRoutes = getCurrentPages(pages, now).map(({ slug }) => `/${slug}`);
  const eventRoutes = events.map(({ _id }) => `/calendar/${_id}`);
  const photoRoutes = albums.flatMap(({ slug, photoKeys }) => [
    `/photos/${slug}`,
    ...(photoKeys ?? []).map((key) => `/photos/${slug}/${key}`),
  ]);

  return [...getStaticRoutes(), ...classRoutes, ...pageRoutes, ...eventRoutes, ...photoRoutes].map(
    (route) => ({
      url: `${SITE_URL}${route === "/" ? "" : route}`,
    }),
  );
}

const getRoutePath = (pageFile: string) =>
  `/${pageFile
    .split(sep)
    .slice(0, -1)
    .filter((segment) => !/^\(.+\)$/.test(segment))
    .join("/")}`;

const getStaticRoutes = () =>
  readdirSync(APP_DIR, { encoding: "utf8", recursive: true })
    .filter((file) => basename(file) === "page.tsx" && !file.includes("["))
    .map(getRoutePath)
    .sort();
