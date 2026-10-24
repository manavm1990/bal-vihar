import { readdirSync } from "node:fs";
import { basename, join, sep } from "node:path";
import { SITE_URL } from "@lib/constants";
import { client } from "@lib/sanity/client";
import { CLASS_PAGES_QUERY } from "@lib/sanity/queries";
import type { MetadataRoute } from "next";

const APP_DIR = join(process.cwd(), "app");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const classPages = await client.fetch(CLASS_PAGES_QUERY);
  const classRoutes = classPages.flatMap(({ slug }) =>
    slug ? [`/education/classes/${slug}`] : [],
  );

  return [...getStaticRoutes(), ...classRoutes].map((route) => ({
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
