import { UploadIcon } from "@sanity/icons/Upload";
import { defineField, defineType } from "sanity";
import { getCurrentSchoolYear, SCHOOL_YEARS } from "../school-years";

const IMPORT_KINDS = [
  { title: "Calendar", value: "calendar" },
  { title: "Event volunteers", value: "volunteerRoster" },
];

const getKindTitle = (kind: unknown) => IMPORT_KINDS.find(({ value }) => value === kind)?.title;

const isCalendar = (document?: Record<string, unknown>) => document?.["kind"] === "calendar";

export const spreadsheetImport = defineType({
  name: "spreadsheetImport",
  title: "Excel upload",
  type: "document",
  icon: UploadIcon,
  fields: [
    defineField({
      name: "kind",
      title: "What is in the file?",
      type: "string",
      options: { list: IMPORT_KINDS },
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description: "Pick the school year this list is for. The list on the website is replaced.",
      options: { list: SCHOOL_YEARS, layout: "dropdown" },
      initialValue: getCurrentSchoolYear,
      hidden: ({ document }) => isCalendar(document),
      validation: (rule) =>
        rule.custom((value, { document }) =>
          isCalendar(document) || value ? true : "Pick the school year.",
        ),
    }),
    defineField({
      name: "file",
      title: "Excel file",
      type: "file",
      description:
        "Step 1: choose your Excel (.xlsx) file here. Step 2: click Publish at the bottom right. Step 3: wait about a minute. The Result appears below, starting with the time it ran. To import another file, choose it here and click Publish again. The first rows of the sheet must be column headings. Calendar: “Date” and “Name” are needed; “Time”, “Where”, “Kind”, “Notes” and “Highlight” are optional. Event volunteers: “Volunteer name” and “Events” (several events separated by commas).",
      options: { accept: ".xlsx" },
      validation: (rule) => rule.required().error("Choose the Excel file."),
    }),
    defineField({
      name: "importReport",
      title: "Result",
      type: "text",
      rows: 8,
      readOnly: true,
      hidden: ({ value }) => !value,
      description:
        "What was imported and any rows that were skipped. Filled in automatically. If the time at the start is old, wait a minute for the new result.",
    }),
    defineField({
      name: "processedFile",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: { kind: "kind", schoolYear: "schoolYear", importReport: "importReport" },
    prepare: ({ kind, schoolYear, importReport }) => ({
      title: getKindTitle(kind) ?? "Excel upload",
      subtitle:
        typeof importReport === "string"
          ? importReport.split("\n")[0]
          : [schoolYear, "Waiting to be imported"].filter(Boolean).join(" · "),
    }),
  },
});
