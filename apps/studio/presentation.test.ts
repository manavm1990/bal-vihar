import { deepStrictEqual } from "node:assert/strict";
import { globSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { resolve } from "./presentation";

const CATCH_ALL_PAGE = "[slug]/page.tsx";
const WEBSITE_APP = join(import.meta.dirname, "../website/app");
const SAMPLE_DOC = { date: "2026-01-01", schoolYear: "2026-27", slug: "sample", title: "Sample" };

test("every Presentation location points to a real website route", () => {
  const pagePaths = globSync("**/page.tsx", { cwd: WEBSITE_APP });
  const fixedRoutes = pagePaths.filter((path) => path !== CATCH_ALL_PAGE).map(createRoutePattern);
  const catchAllRoute = createRoutePattern(CATCH_ALL_PAGE);

  const missing = Object.entries(resolve.locations).flatMap(([type, location]) => {
    const routes = type === "page" ? [catchAllRoute] : fixedRoutes;
    const hrefs = location.resolve(SAMPLE_DOC)?.locations?.map(({ href }) => href) ?? [];

    return hrefs
      .filter((href) => !routes.some((route) => route.test(href)))
      .map((href) => `${type}: ${href}`);
  });

  deepStrictEqual(missing, []);
});

function createRoutePattern(pagePath: string) {
  const segments = pagePath
    .split("/")
    .slice(0, -1)
    .filter((segment) => !/^\(.+\)$/.test(segment))
    .map((segment) => (/^\[.+\]$/.test(segment) ? "[^/]+" : segment));

  return new RegExp(`^/${segments.join("/")}$`);
}
