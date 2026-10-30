import { locateColumns, type Row, SheetError, toText } from "./sheet";

export interface CalendarEvent {
  academicYear: string;
  date: string;
  description?: string;
  eventType: string;
  isHighlighted: boolean;
  location?: string;
  time?: string;
  title: string;
}

export interface Problem {
  reason: string;
  row: number;
}

const AUGUST = 8;
const EVENT_TYPES = new Map([
  ["celebration", "celebration"],
  ["holiday", "holiday"],
  ["project", "project"],
  ["project / show", "project"],
  ["project/show", "project"],
  ["regular", "regular"],
  ["regular classes", "regular"],
  ["special", "special"],
  ["special event", "special"],
]);
const HEADINGS = [
  { pattern: /^date$/i, required: true },
  { pattern: /^(event( name)?|name|title)$/i, required: true },
  { pattern: /^time$/i },
  { pattern: /^(where|location)$/i },
  { pattern: /^(kind|type)( of event)?$/i },
  { pattern: /^(notes?|description)$/i },
  { pattern: /^highlight(ed)?$/i },
];
const HIGHLIGHTED = /^(x|y|yes|true|1)$/i;
const ISO_DATE = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const US_DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/;

export function parseCalendarEvents(rows: Row[]) {
  const located = locateColumns(rows, HEADINGS);
  if (!located) throw new SheetError("could not find the “Date” and “Name” columns.");

  const [
    dateColumn = -1,
    titleColumn = -1,
    timeColumn = -1,
    locationColumn = -1,
    kindColumn = -1,
    notesColumn = -1,
    highlightColumn = -1,
  ] = located.columns;
  const events = new Map<string, CalendarEvent>();
  const problems: Problem[] = [];

  // Yes, imperative > functional here.
  for (const [offset, row] of rows.slice(located.start + 1).entries()) {
    if (isBlankRow(row)) continue;

    const sheetRow = located.start + offset + 2;
    const title = toText(row[titleColumn]);
    const date = parseDate(row[dateColumn]);
    const kind = toText(row[kindColumn]);
    const eventType = kind ? EVENT_TYPES.get(kind.toLowerCase()) : "regular";

    if (!title) problems.push({ row: sheetRow, reason: "it has no name" });
    else if (!date) problems.push({ row: sheetRow, reason: "the date is missing or not a date" });
    else if (!eventType)
      problems.push({
        row: sheetRow,
        reason: `“${kind}” is not a kind of event (use Regular classes, Special event, Celebration, Holiday or Project / show)`,
      });
    else {
      const key = createEventKey(date, title);
      const time = formatTime(row[timeColumn]);
      const location = toText(row[locationColumn]).replace(/\s*\/\s*/g, "/");
      const description = toText(row[notesColumn]);

      if (!events.has(key))
        events.set(key, {
          academicYear: getAcademicYear(date),
          date,
          ...(description ? { description } : {}),
          eventType,
          isHighlighted:
            row[highlightColumn] === true || HIGHLIGHTED.test(toText(row[highlightColumn])),
          ...(location ? { location } : {}),
          ...(time ? { time } : {}),
          title,
        });
    }
  }

  return { events: [...events.values()], problems } as const;
}

export const createEventKey = (date: string, title: string) =>
  `${date}|${title.replace(/\s+/g, " ").trim().toLowerCase()}`;

function formatDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  const isReal =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;

  return isReal ? `${year}-${padTwo(month)}-${padTwo(day)}` : null;
}

function formatTime(cell: unknown) {
  if (!(cell instanceof Date)) return toText(cell);

  const hours = cell.getUTCHours();

  return `${hours % 12 || 12}:${padTwo(cell.getUTCMinutes())} ${hours < 12 ? "A.M." : "P.M."}`;
}

function getAcademicYear(date: string) {
  const year = Number(date.slice(0, 4));
  const start = Number(date.slice(5, 7)) >= AUGUST ? year : year - 1;

  return `${start}-${padTwo((start + 1) % 100)}`;
}

const isBlankRow = (row: Row) =>
  row.every((cell) => cell === null || cell === undefined || toText(cell) === "");

const padTwo = (value: number) => String(value).padStart(2, "0");

function parseDate(cell: unknown) {
  if (cell instanceof Date)
    return formatDate(cell.getUTCFullYear(), cell.getUTCMonth() + 1, cell.getUTCDate());

  const text = toText(cell);
  const iso = ISO_DATE.exec(text);
  if (iso) return formatDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));

  const us = US_DATE.exec(text);
  if (!us) return null;

  const year = Number(us[3]);

  return formatDate(year < 100 ? 2000 + year : year, Number(us[1]), Number(us[2]));
}
