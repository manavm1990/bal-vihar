import type { Template } from "sanity";

export const UPLOADS = {
  calendar: { id: "calendarUpload", template: "spreadsheetImport-calendar" },
  volunteerRoster: { id: "volunteerRosterUpload", template: "spreadsheetImport-volunteerRoster" },
} as const;

export const templates: Template[] = [
  {
    id: UPLOADS.calendar.template,
    title: "Calendar from Excel",
    schemaType: "spreadsheetImport",
    value: { kind: "calendar" },
  },
  {
    id: UPLOADS.volunteerRoster.template,
    title: "Event volunteers from Excel",
    schemaType: "spreadsheetImport",
    value: { kind: "volunteerRoster" },
  },
];
