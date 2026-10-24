import { readdirSync } from "node:fs";
import { basename, join, sep } from "node:path";
import { SITE_URL } from "@lib/constants";
import { client } from "@lib/sanity/client";
import { CALENDAR_EVENTS_QUERY, CLASS_PAGES_QUERY, PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { MetadataRoute } from "next";

const APP_DIR = join(process.cwd(), "app");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [classPages, events, gallery] = await Promise.all([
    client.fetch(CLASS_PAGES_QUERY),
    client.fetch(CALENDAR_EVENTS_QUERY),
    client.fetch(PHOTO_GALLERY_QUERY),
  ]);
  const classRoutes = classPages.flatMap(({ slug }) =>
    slug ? [`/education/classes/${slug}`] : [],
  );

  const eventRoutes = events.map(({ _id }) => `/calendar/${_id}`);
  const photoRoutes = (gallery?.photos ?? []).flatMap((photo) =>
    photo.image?.asset ? [`/photos/${photo._key}`] : [],
  );

  return [...getStaticRoutes(), ...classRoutes, ...eventRoutes, ...photoRoutes].map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
  }));
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
