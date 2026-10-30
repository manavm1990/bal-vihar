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
      options: { list: IMPORT_KINDS, layout: "radio" },
      validation: (rule) => rule.required().error("Pick what the file contains."),
    }),
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description: "The list on the website is replaced with this file.",
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
        "An .xlsx file with column headings in its first rows. Event volunteers: “Volunteer name” and “Events” (several events separated by commas). Calendar: “Date” and “Name”, plus optional “Time”, “Where”, “Kind”, “Notes” and “Highlight”. Then click Publish. A minute or so later the result appears below. To upload another file, make a new Excel upload.",
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
      description: "What was imported and any rows that were skipped. Filled in automatically.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
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
