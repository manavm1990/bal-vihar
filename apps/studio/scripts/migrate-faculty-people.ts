/**
 * One-off: copies each person picked in Teaching Faculty into the document itself (name, email,
 * phone), then deletes the separate "person" documents.
 *
 * Run from apps/studio, signed in with `bunx sanity login`. Try a dry run first, which changes
 * nothing and only prints what it would do:
 *   bunx sanity exec scripts/migrate-faculty-people.ts --with-user-token -- --dry-run
 * Then for real:
 *   bunx sanity exec scripts/migrate-faculty-people.ts --with-user-token
 *
 * Safe to run twice: entries that already hold a name are left alone, and people are deleted only
 * when nothing else refers to them.
 */
import { getCliClient } from "sanity/cli";

interface PersonDocument {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface Reference {
  _ref?: string;
}

interface Keyed {
  _key: string;
  _type?: string;
  [field: string]: unknown;
}

const DRY_RUN = process.argv.includes("--dry-run");
const FACULTY_IDS = ["teachingFaculty", "drafts.teachingFaculty"];

async function migrateFacultyPeople() {
  const client = getCliClient({ apiVersion: "2025-01-01" });
  const people = new Map(
    (await client.fetch<PersonDocument[]>('*[_type == "person"]')).map((person) => [
      person._id,
      person,
    ]),
  );
  console.log(`${people.size} people found${DRY_RUN ? " (dry run: nothing will change)" : ""}.`);

  const toContact = (reference: unknown) => {
    const person = isRecord(reference) ? people.get(String((reference as Reference)._ref)) : null;
    if (!person?.name) return null;

    return {
      name: person.name,
      ...(person.email ? { email: person.email } : {}),
      ...(person.phone ? { phone: person.phone } : {}),
    };
  };

  for (const id of FACULTY_IDS) {
    const faculty = await client.getDocument<{
      groups?: Keyed[];
      programs?: Keyed[];
    }>(id);
    if (!faculty) continue;

    let copied = 0;
    let dropped = 0;

    const convertContacts = (list: unknown): Keyed[] =>
      (Array.isArray(list) ? (list as Keyed[]) : []).flatMap((item) => {
        // Already typed in place by a previous run.
        if (typeof item["name"] === "string") return [item];

        const contact = toContact(item);
        if (!contact) {
          dropped += 1;
          return [];
        }
        copied += 1;

        return [{ _key: item._key, _type: "facultyContact", ...contact }];
      });

    const convertTeachers = (list: unknown): Keyed[] =>
      (Array.isArray(list) ? (list as Keyed[]) : []).flatMap((slot) => {
        if (typeof slot["name"] === "string") return [slot];

        const contact = toContact(slot["person"]);
        if (!contact) {
          dropped += 1;
          return [];
        }
        copied += 1;

        return [
          { _key: slot._key, _type: "teacher", isBackup: slot["isBackup"] === true, ...contact },
        ];
      });

    const groups = (faculty.groups ?? []).map((group) => ({
      ...group,
      teams: ((group["teams"] as Keyed[] | undefined) ?? []).map((team) => ({
        ...team,
        teachers: convertTeachers(team["teachers"]),
      })),
    }));
    const programs = (faculty.programs ?? []).map((program) => ({
      ...program,
      coordinators: convertContacts(program["coordinators"]),
      team: convertContacts(program["team"]),
    }));

    console.log(`${id}: ${copied} people copied in, ${dropped} empty entries dropped.`);
    if (!DRY_RUN) await client.patch(id).set({ groups, programs }).commit();
  }

  if (DRY_RUN) {
    console.log(
      "Dry run finished. A real run copies the people in, then deletes the people documents.",
    );
    return;
  }

  const stillUsed = await client.fetch<number>(
    'count(*[_type != "person" && references(*[_type == "person"]._id)])',
  );
  if (stillUsed > 0) {
    console.log(`${stillUsed} documents still point at people, so none were deleted.`);
    return;
  }

  console.log(`Deleting ${people.size} separate people documents.`);
  await client.delete({ query: '*[_type == "person"]' });
  console.log("Done.");
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

migrateFacultyPeople().catch((error: unknown) => {
  console.error("Could not migrate the faculty people", error);
  process.exit(1);
});
