import { UploadIcon } from "@sanity/icons/Upload";
import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { getCurrentSchoolYear, SCHOOL_YEARS } from "../school-years";

const IMPORT_KINDS = [
  { title: "Calendar", value: "calendar" },
  { title: "Event volunteers", value: "volunteerRoster" },
];

const getKindTitle = (kind: unknown) => IMPORT_KINDS.find(({ value }) => value === kind)?.title;

const isCalendar = (document?: Record<string, unknown>) => document?.["kind"] === "calendar";

const createInstructionLine = (label: string, text: string) =>
  createElement("div", null, createElement("strong", null, `${label} `), text);

const createUploadInstructions = () =>
  createElement(
    "div",
    null,
    createInstructionLine(
      "Step 1.",
      "Drag your spreadsheet into the box below, or click Upload. It must be an .xlsx file.",
    ),
    createInstructionLine("Step 2.", "Click Publish at the bottom right."),
    createInstructionLine(
      "Step 3.",
      "Wait about a minute. The Result appears below, starting with the time it ran.",
    ),
    createElement("br"),
    createInstructionLine("Another file?", "Add it in the box below and click Publish again."),
    createElement("br"),
    createInstructionLine(
      "Column headings.",
      "The first rows of the sheet must be column headings.",
    ),
    createInstructionLine(
      "Calendar:",
      "“Date” and “Name” are needed; “Time”, “Where”, “Kind”, “Notes” and “Highlight” are optional.",
    ),
    createInstructionLine(
      "Event volunteers:",
      "“Volunteer name” and “Events” (several events separated by commas).",
    ),
  );

export const spreadsheetImport = defineType({
  name: "spreadsheetImport",
  title: "Spreadsheet upload",
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
      title: "Spreadsheet file",
      type: "file",
      description: createUploadInstructions(),
      options: { accept: ".xlsx" },
      validation: (rule) => rule.required().error("Choose the spreadsheet file."),
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
      title: getKindTitle(kind) ?? "Spreadsheet upload",
      subtitle:
        typeof importReport === "string"
          ? importReport.split("\n")[0]
          : [schoolYear, "Waiting to be imported"].filter(Boolean).join(" · "),
    }),
  },
});
