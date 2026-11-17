import { UploadIcon } from "@sanity/icons/Upload";
import { createElement, Fragment } from "react";
import { defineField, defineType, type FileInputProps, useFormValue } from "sanity";
import { getCurrentSchoolYear, SCHOOL_YEARS } from "../school-years";

const IMPORT_KINDS = [
  { title: "Calendar", value: "calendar" },
  { title: "Event volunteers", value: "volunteerRoster" },
];

const getKindTitle = (kind: unknown) => IMPORT_KINDS.find(({ value }) => value === kind)?.title;

const isCalendar = (document?: Record<string, unknown>) => document?.["kind"] === "calendar";

const createInstructionLine = (label: string, text: string) =>
  createElement("div", null, createElement("strong", null, `${label} `), text);

const createUploadInstructions = (isCalendarUpload: boolean) =>
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
    createInstructionLine(
      "Wrong file?",
      "Click “Undo last upload” in the menu next to Publish. It puts things back as they were.",
    ),
    createElement("br"),
    isCalendarUpload
      ? createInstructionLine(
          "This upload only adds events.",
          "Fixing a name or date in the sheet adds a second event, so the Result lists those to check and delete.",
        )
      : createInstructionLine(
          "This upload replaces the whole list,",
          "including changes typed in by hand.",
        ),
    createInstructionLine(
      "Column headings.",
      isCalendarUpload
        ? "The first row must be headings. “Date” and “Name” are needed; “Time”, “Where”, “Kind”, “Notes” and “Highlight” are optional."
        : "The first row must be headings: “Volunteer name” and “Events” (several events separated by commas).",
    ),
    createElement("br"),
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
      description: "An .xlsx file. The steps are below.",
      components: { input: UploadInput },
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
      name: "undoData",
      type: "text",
      readOnly: true,
      hidden: true,
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

function UploadInput(props: FileInputProps) {
  const isCalendarUpload = useFormValue(["kind"]) === "calendar";

  return createElement(
    Fragment,
    null,
    createUploadInstructions(isCalendarUpload),
    props.renderDefault(props),
  );
}
