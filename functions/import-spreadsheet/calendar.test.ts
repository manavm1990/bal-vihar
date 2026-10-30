import { deepStrictEqual, equal, throws } from "node:assert/strict";
import { test } from "node:test";
import { createEventKey, parseCalendarEvents } from "./calendar";
import { SheetError } from "./sheet";

test("reads dates, times and optional columns below a title row", () => {
  const { events, problems } = parseCalendarEvents([
    ["Calendar 2025-26"],
    ["Date", "Name", "Time", "Where", "Kind", "Notes", "Highlight"],
    ["2025-09-07", "Diwali", "10:00 A.M.", "HT / HTCC", "Celebration", "Bring a dish", "Yes"],
    ["9/14/25", "Regular classes"],
    [new Date(Date.UTC(2025, 9, 5)), "Garba night", new Date(Date.UTC(1899, 11, 30, 18, 30))],
  ]);

  deepStrictEqual(problems, []);
  deepStrictEqual(events, [
    {
      academicYear: "2025-26",
      date: "2025-09-07",
      description: "Bring a dish",
      eventType: "celebration",
      isHighlighted: true,
      location: "HT/HTCC",
      time: "10:00 A.M.",
      title: "Diwali",
    },
    {
      academicYear: "2025-26",
      date: "2025-09-14",
      eventType: "regular",
      isHighlighted: false,
      title: "Regular classes",
    },
    {
      academicYear: "2025-26",
      date: "2025-10-05",
      eventType: "regular",
      isHighlighted: false,
      time: "6:30 P.M.",
      title: "Garba night",
    },
  ]);
});

test("the school year starts in August", () => {
  const { events } = parseCalendarEvents([
    ["Date", "Name"],
    ["2025-07-31", "Summer"],
    ["2025-08-01", "New year"],
    ["2026-03-01", "Spring"],
  ]);

  deepStrictEqual(
    events.map(({ academicYear }) => academicYear),
    ["2024-25", "2025-26", "2025-26"],
  );
});

test("kind names match the Studio labels and short forms", () => {
  const { events, problems } = parseCalendarEvents([
    ["Date", "Name", "Kind"],
    ["2025-09-01", "A", "Project / Show"],
    ["2025-09-02", "B", "special event"],
    ["2025-09-03", "C", "Holiday"],
  ]);

  deepStrictEqual(problems, []);
  deepStrictEqual(
    events.map(({ eventType }) => eventType),
    ["project", "special", "holiday"],
  );
});

test("rows that cannot be used are reported with their sheet row number", () => {
  const { events, problems } = parseCalendarEvents([
    ["Date", "Name", "Kind"],
    ["2025-09-07", "", ""],
    ["", "No date", ""],
    ["2025-02-30", "Impossible", ""],
    ["2025-09-07", "Odd kind", "Picnic"],
    [null, null, null],
    ["2025-09-08", "Fine", ""],
  ]);

  deepStrictEqual(problems, [
    { row: 2, reason: "it has no name" },
    { row: 3, reason: "the date is missing or not a date" },
    { row: 4, reason: "the date is missing or not a date" },
    {
      row: 5,
      reason:
        "“Picnic” is not a kind of event (use Regular classes, Special event, Celebration, Holiday or Project / show)",
    },
  ]);
  deepStrictEqual(
    events.map(({ title }) => title),
    ["Fine"],
  );
});

test("a kind named like an object property is not a kind of event", () => {
  const { events, problems } = parseCalendarEvents([
    ["Date", "Name", "Kind"],
    ["2025-09-07", "Odd", "constructor"],
  ]);

  equal(events.length, 0);
  equal(problems.length, 1);
});

test("the first of two rows with the same date and name wins, whatever the spacing or case", () => {
  const { events } = parseCalendarEvents([
    ["Date", "Name", "Notes"],
    ["2025-09-07", "Diwali  Party", "first"],
    ["9/7/2025", "diwali party", "second"],
  ]);

  equal(events.length, 1);
  equal(events[0]?.description, "first");
});

test("event keys ignore case and extra spaces so existing events are recognised", () => {
  equal(
    createEventKey("2025-09-07", "  Diwali   Party "),
    createEventKey("2025-09-07", "diwali party"),
  );
});

test("a sheet without the Date and Name headings is refused", () => {
  throws(() => parseCalendarEvents([["Foo", "Bar"]]), SheetError);
});
