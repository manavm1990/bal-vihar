import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineField, defineType } from "sanity";

export const calendarEvent = defineType({
  name: "calendarEvent",
  title: "Calendar Event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "details", title: "Event Details" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      description: "The name of the event or activity",
      validation: (rule) => rule.required(),
      group: "details",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Date of the event",
      validation: (rule) => rule.required(),
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      group: "details",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where the event takes place (e.g., HTCC, HT/HTCC, HTCC/MGC)",
      options: {
        list: [
          { title: "HTCC", value: "HTCC" },
          { title: "HT/HTCC", value: "HT/HTCC" },
          { title: "HTCC/MGC", value: "HTCC/MGC" },
        ],
      },
      group: "details",
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      description: "Type of event for styling and organization",
      options: {
        list: [
          { title: "Regular Classes", value: "regular" },
          { title: "Special Event", value: "special" },
          { title: "Celebration", value: "celebration" },
          { title: "Holiday", value: "holiday" },
          { title: "Project/Show", value: "project" },
        ],
        layout: "radio",
      },
      initialValue: "regular",
      group: "details",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: 'Time of the event (e.g., "10:00 A.M.–12:30 P.M.")',
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Additional Notes",
      type: "text",
      description: "Any additional information about the event",
      group: "details",
    }),
    defineField({
      name: "isHighlighted",
      title: "Highlight Event",
      type: "boolean",
      description: "Mark this event as important or featured on the site",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "academicYear",
      title: "Academic Year",
      type: "string",
      description: 'Academic year (e.g., "2025-26")',
      initialValue: "2025-26",
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
      return {
        title: title || "Untitled Event",
        subtitle: `${eventDate} • ${location || "No location"} • ${eventType || "regular"}`,
      };
    },
  },
  orderings: [
    {
      title: "Date, New to Old",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Old to New",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
