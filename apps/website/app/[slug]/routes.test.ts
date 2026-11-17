import { deepStrictEqual, ok } from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { HEADER_MENUS, RESERVED_SLUGS } from "@bv/schemas/route-config";
import nextConfig from "../../next.config";
import { NAVIGATION } from "../components/header/navs/constants";

const APP_DIR = fileURLToPath(new URL("../", import.meta.url));
const IMAGE_ROUTE_FILE = /^(.+-image)\.(?:tsx?|js)$/;
const ROUTE_FILE = /^(?:page|route)\.(?:tsx?|js)$/;

test("reserved slugs match the top-level routes and redirects of the site", async () => {
  deepStrictEqual([...RESERVED_SLUGS].sort(), [...(await getTopLevelSegments())].sort());
});

test("every header menu an editor can pick is a real navigation menu", () => {
  const names = NAVIGATION.map(({ name }) => name);

  for (const menu of HEADER_MENUS) ok(names.includes(menu), `${menu} is not in NAVIGATION`);
});

const hasRoute = (dir: string): boolean =>
  readdirSync(dir, { withFileTypes: true }).some((entry) =>
    entry.isFile() ? ROUTE_FILE.test(entry.name) : hasRoute(join(dir, entry.name)),
  );

async function getTopLevelSegments() {
  const entries = readdirSync(APP_DIR, { withFileTypes: true });
  const folders = entries
    .filter(
      (entry) =>
        entry.isDirectory() && /^[a-z0-9]/.test(entry.name) && hasRoute(join(APP_DIR, entry.name)),
    )
    .map((entry) => entry.name);
  const imageRoutes = entries.flatMap((entry) => {
    const stem = entry.isFile() ? IMAGE_ROUTE_FILE.exec(entry.name)?.[1] : undefined;

    return stem ? [stem] : [];
  });

  const redirects = await nextConfig.redirects?.();
  const redirectSegments = (redirects ?? []).flatMap(({ source }) => {
    const segment = source.split("/")[1];

    return segment && !segment.startsWith(":") ? [segment] : [];
  });

  return [...new Set([...folders, ...imageRoutes, ...redirectSegments])];
}
