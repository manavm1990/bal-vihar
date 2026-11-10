import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineField, defineType } from "sanity";
import { getCurrentSchoolYear, SCHOOL_YEARS } from "../school-years";

const EVENT_TYPES = [
  { title: "Regular classes", value: "regular", label: "Classes" },
  { title: "Special event", value: "special", label: "Special" },
  { title: "Celebration", value: "celebration", label: "Celebration" },
  { title: "Holiday", value: "holiday", label: "Holiday" },
  { title: "Project / show", value: "project", label: "Project" },
] as const;

export const calendarEvent = defineType({
  name: "calendarEvent",
  title: "Calendar event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "details", title: "Event", default: true },
    { name: "settings", title: "Extra" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: "What parents will see on the calendar.",
      validation: (rule) => rule.required().error("Add an event name."),
      group: "details",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Day of the event.",
      validation: (rule) => rule.required().error("Pick a date."),
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      group: "details",
    }),
    defineField({
      name: "time",
      title: "Time (optional)",
      type: "string",
      description: 'e.g. "10:00 A.M.–12:30 P.M."',
      group: "details",
    }),
    defineField({
      name: "location",
      title: "Where",
      type: "string",
      description: "Usually HTCC.",
      options: {
        list: [
          { title: "HTCC", value: "HTCC" },
          { title: "HT / HTCC", value: "HT/HTCC" },
          { title: "HTCC / MGC", value: "HTCC/MGC" },
        ],
      },
      group: "details",
    }),
    defineField({
      name: "eventType",
      title: "Kind of event",
      type: "string",
      description: "Used for grouping on the site.",
      options: {
        list: EVENT_TYPES.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "regular",
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Extra notes (optional)",
      type: "text",
      description:
        "For specials: what the event is, what to bring, dress code, etc. Shown in the event details dialog.",
      group: "details",
    }),
    defineField({
      name: "isHighlighted",
      title: "Highlight on the site",
      type: "boolean",
      description: "Turn on for especially important events.",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "academicYear",
      title: "School year",
      type: "string",
      options: { list: SCHOOL_YEARS, layout: "dropdown" },
      initialValue: getCurrentSchoolYear,
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      location: "location",
      eventType: "eventType",
    },
    prepare({ title, date, location, eventType }) {
      const eventDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date";
      const kind = EVENT_TYPES.find((type) => type.value === eventType)?.label ?? "Classes";
      return {
        title: title || "Untitled event",
        subtitle: `${eventDate} · ${location || "Location TBD"} · ${kind}`,
      };
    },
  },
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, oldest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
