import { createClient, isHttpError, type SanityClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { readSheet } from "read-excel-file/universal";
import { type CalendarEvent, createEventKey, type Problem, parseCalendarEvents } from "./calendar";
import { type Row, SheetError } from "./sheet";
import { parseVolunteerRoster, type VolunteerActivity } from "./volunteers";

interface ExistingEvent {
  date?: string | null;
  title?: string | null;
}

interface SpreadsheetImportEvent {
  _id: string;
  _rev: string;
  fileUrl?: string | null;
  kind?: string | null;
  schoolYear?: string | null;
}

const API_VERSION = "2025-05-08";
const FETCH_TIMEOUT_MS = 30_000;
const MAX_LISTED_PROBLEMS = 20;
const ROSTER_ID = "volunteerRoster";

export const handler = documentEventHandler<SpreadsheetImportEvent>(async ({ context, event }) => {
  const { _id, _rev } = event.data;
  const client = createClient({ ...context.clientOptions, apiVersion: API_VERSION, useCdn: false });
  const isDryRun = context.local === true;

  const importReport = await runImport(client, event.data, isDryRun).catch(describeFailure);

  console.info(importReport);
  if (isDryRun) return;

  // Fails if the upload was edited meanwhile, so the run starts again...
  await client.patch(_id).ifRevisionId(_rev).set({ importReport }).commit();
});

const createReport = (summary: string, details: string[] = []) =>
  [`${formatNow()}: ${summary}`, ...details].join("\n");

function describeFailure(error: unknown) {
  if (error instanceof SheetError) return createReport(`Nothing was imported: ${error.message}`);

  console.error("Spreadsheet import failed", error);

  const reason = isHttpError(error)
    ? `Sanity would not save it (${error.message})`
    : "something went wrong, so please try again";

  return createReport(`Nothing was imported: ${reason}.`);
}

function formatLongSchoolYear(schoolYear: string | null | undefined) {
  const start = Number(/^(\d{4})-\d{2}$/.exec(schoolYear ?? "")?.[1]);
  if (!start) throw new SheetError("pick the school year, then publish again.");

  return `${start}–${start + 1}`;
}

const formatNow = () =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date());

async function importCalendar(client: SanityClient, rows: Row[], isDryRun: boolean) {
  const { events, problems } = parseCalendarEvents(rows);
  if (events.length === 0 && problems.length === 0)
    throw new SheetError("no events were found below the headings.");

  const existing = new Set(
    (await client.fetch<ExistingEvent[]>('*[_type == "calendarEvent"]{date, title}')).map(
      ({ date, title }) => createEventKey(date ?? "", title ?? ""),
    ),
  );
  const added = events.filter(({ date, title }) => !existing.has(createEventKey(date, title)));
  const alreadyListed = events.length - added.length;

  if (!isDryRun && added.length > 0)
    await added
      .reduce(
        (transaction, event) => transaction.create(toCalendarEvent(event)),
        client.transaction(),
      )
      .commit();

  const summary = [
    `${added.length} ${added.length === 1 ? "event" : "events"} added`,
    alreadyListed > 0 && `${alreadyListed} already on the calendar`,
    problems.length > 0 && `${problems.length} skipped`,
  ]
    .filter(Boolean)
    .join(", ");

  return createReport(`${summary}.`, listProblems(problems));
}

async function importVolunteerRoster(
  client: SanityClient,
  rows: Row[],
  schoolYear: string | null | undefined,
  isDryRun: boolean,
) {
  const { activities, skippedRows, volunteerCount } = parseVolunteerRoster(rows);
  const longSchoolYear = formatLongSchoolYear(schoolYear);
  if (activities.length === 0) throw new SheetError("no volunteers with events were found.");

  if (!isDryRun) await replaceRoster(client, longSchoolYear, activities);

  return createReport(
    `${volunteerCount} volunteers across ${activities.length} events imported for ${longSchoolYear}. The event volunteers list was replaced.`,
    skippedRows > 0
      ? [`${skippedRows} rows had no events, for example people who declined, and were left out.`]
      : [],
  );
}

const listProblems = (problems: Problem[]) => [
  ...problems
    .slice(0, MAX_LISTED_PROBLEMS)
    .map(({ row, reason }) => `Skipped row ${row}: ${reason}.`),
  ...(problems.length > MAX_LISTED_PROBLEMS
    ? [`…and ${problems.length - MAX_LISTED_PROBLEMS} more rows skipped.`]
    : []),
];

async function readRows(fileUrl: string) {
  const response = await fetch(fileUrl, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new SheetError(`the file could not be downloaded (${response.status}).`);

  try {
    return await readSheet(await response.blob());
  } catch (error) {
    console.error("Could not read the workbook", error);
    throw new SheetError(
      "the file could not be read. Save it as an .xlsx workbook and upload it again.",
    );
  }
}

async function replaceRoster(
  client: SanityClient,
  schoolYear: string,
  activities: VolunteerActivity[],
) {
  const draftId = `drafts.${ROSTER_ID}`;
  const fields = { schoolYear, activities: activities.map(toActivity) };
  const transaction = client
    .transaction()
    .createOrReplace({ _id: ROSTER_ID, _type: "volunteerRoster", ...fields });

  if (await client.getDocument(draftId)) transaction.patch(draftId, { set: fields });

  await transaction.commit();
}

async function runImport(
  client: SanityClient,
  { fileUrl, kind, schoolYear }: SpreadsheetImportEvent,
  isDryRun: boolean,
) {
  if (!fileUrl) throw new SheetError("no file was attached.");

  const rows = await readRows(fileUrl);

  if (kind === "calendar") return importCalendar(client, rows, isDryRun);
  if (kind === "volunteerRoster") return importVolunteerRoster(client, rows, schoolYear, isDryRun);

  throw new SheetError("pick what the file contains, then publish again.");
}

const toActivity = ({ name, volunteers }: VolunteerActivity) => ({
  _type: "volunteerActivity",
  _key: crypto.randomUUID().slice(0, 12),
  name,
  volunteers,
});

const toCalendarEvent = (event: CalendarEvent) => ({ _type: "calendarEvent", ...event });
