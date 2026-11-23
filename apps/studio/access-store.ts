import { isStudioRole } from "@bv/schemas";
import type { SanityClient } from "sanity";
import type { Person } from "./roles";

const ACCESS_QUERY = `*[_id == "studioAccess"][0].people[]{
  "id": member.id,
  "name": member.name,
  role,
  "classes": classes[]->slug.current
}`;

let people: ReadonlyMap<string, Person> = new Map();
let loading: Promise<void> | undefined;

export const getPeople = () => people;

export function loadPeople(client: SanityClient) {
  loading ??= client
    .fetch<unknown>(ACCESS_QUERY, {}, { perspective: "published" })
    .then((rows) => {
      people = parsePeople(rows);
    })
    .catch((error: unknown) => console.error("Could not load Who sees what", error));

  return loading;
}

export function parsePeople(rows: unknown) {
  const entries = (Array.isArray(rows) ? rows : []).flatMap((row: unknown) => {
    if (typeof row !== "object" || row === null) return [];
    if (!("id" in row) || typeof row.id !== "string") return [];
    if (!("role" in row) || !isStudioRole(row.role)) return [];

    const classes =
      row.role === "teacher" && "classes" in row && Array.isArray(row.classes)
        ? row.classes.filter((slug: unknown) => typeof slug === "string")
        : undefined;
    const name = "name" in row && typeof row.name === "string" ? row.name : undefined;

    return [[row.id, { classes, name, role: row.role }] as const];
  });

  return new Map<string, Person>(entries);
}
