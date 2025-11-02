import { defineField, defineType } from "sanity";

export const calendarEventSchema = defineType({
  name: "calendarEvent",
  title: "Calendar Event",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Activity",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) =>
        Rule.required().error("Every event must have a date"),
      options: {
        dateFormat: "MMM DD, YYYY",
      },
    }),

    defineField({
      name: "startTime",
      title: "Start Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      options: {
        timeStep: 30,
      },
    }),

    defineField({
      name: "endTime",
      title: "End Time",
      type: "datetime",
      validation: (Rule) =>
        Rule.custom((endTime, context) => {
          const startTime = context.parent?.startTime;
          if (!endTime) return true; // Optional - allow empty
          if (startTime && new Date(endTime) <= new Date(startTime)) {
            return "End time must be after start time";
          }
          return true;
        }),
      options: {
        timeStep: 30,
      },
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Hindu Temple Community Center", value: "HTCC" },
          { title: "Mahatma Gandhi Center", value: "MGC" },
          { title: "Hindu Temple", value: "HT" },
          { title: "Other", value: "Other" },
        ],
      },
    }),

    defineField({
      name: "customLocation",
      title: "Custom Location",
      type: "string",
      hidden: ({ parent }) => parent?.location !== "Other",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const location = context.parent?.location;
          if (location === "Other" && !value) {
            return "Custom location is required when 'Other' is selected";
          }
          return true;
        }),
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      initialValue: "regular",
      options: {
        list: [
          { title: "Regular Classes", value: "regular" },
          { title: "Special Event", value: "special" },
          { title: "Celebration (Diwali, Holi)", value: "celebration" },
          { title: "Holiday", value: "holiday" },
          { title: "Community Project", value: "project" },
        ],
        layout: "radio", // Radio buttons are clearer than dropdown for 5 options
      },
    }),

    defineField({
      name: "isHighlighted",
      title: "Highlight This Event",
      type: "boolean",
      description:
        "Show this event in red (like Diwali Celebration, Family Night)",
      initialValue: false,
    }),

    defineField({
      name: "academicYear",
      title: "Academic Year",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: ["2024-25", "2025-26", "2026-27"],
      },
      initialValue: "2025-26",
    }),

    defineField({
      name: "description",
      title: "Additional Notes",
      type: "text",
      rows: 2,
    }),
  ],

  // This preview configuration makes the Studio interface much more usable
  preview: {
    select: {
      title: "title",
      date: "date",
      location: "location",
      isHighlighted: "isHighlighted",
    },
    prepare(selection) {
      const { title, date, location, isHighlighted } = selection;
      const dateObj = date ? new Date(date) : null;
      const formattedDate = dateObj
        ? dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "No date";

      return {
        title: isHighlighted ? `⭐ ${title}` : title,
        subtitle: `${formattedDate} • ${location || "No location"}`,
      };
    },
  },
});
