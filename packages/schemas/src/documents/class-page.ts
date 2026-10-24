import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineArrayMember, defineField, defineType } from "sanity";

const GROUP_OPTIONS = [
  { title: "Grade levels (K–7)", value: "grade" },
  { title: "Youth", value: "youth" },
  { title: "Enrichment", value: "enrichment" },
  { title: "Other", value: "other" },
];

const describeSessions = (sessions: unknown) => {
  const count = Array.isArray(sessions) ? sessions.length : 0;

  return count === 0 ? "No sessions yet" : `${count} ${count === 1 ? "session" : "sessions"}`;
};

const formatSessionDate = (date: unknown) =>
  typeof date === "string" && !Number.isNaN(Date.parse(`${date}T12:00:00`))
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

const getGroupTitle = (value: unknown) =>
  GROUP_OPTIONS.find((option) => option.value === value)?.title;

/** New sessions default to today's date at the school, wherever the teacher is editing. */
const getToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

export const classPage = defineType({
  name: "classPage",
  title: "Class page",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "sessions",
      title: "Class sessions",
      type: "array",
      description:
        "Add one row after each class Sunday. Parents see the newest first. Preview on the site before Publish.",
      of: [
        defineArrayMember({
          name: "classSession",
          title: "Session",
          type: "object",
          icon: CalendarIcon,
          fields: [
            defineField({
              name: "date",
              title: "Class date",
              type: "date",
              options: { dateFormat: "YYYY-MM-DD" },
              initialValue: getToday,
              validation: (rule) => rule.required().error("Pick the class date."),
            }),
            defineField({
              name: "covered",
              title: "What we covered",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().error("Add a few lines about the class."),
            }),
            defineField({
              name: "homework",
              title: "Homework (optional)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "links",
              title: "Links for this class (optional)",
              type: "array",
              of: [defineArrayMember({ type: "classLink" })],
            }),
          ],
          preview: {
            select: { date: "date", covered: "covered" },
            prepare: ({ date, covered }) => ({
              title: formatSessionDate(date),
              subtitle: covered,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "teachers",
      title: "Teachers",
      type: "string",
      description: 'Names separated by commas, e.g. "Asha Rao, Vikram Shah".',
    }),
    defineField({
      name: "pinnedNote",
      title: "Pinned note (optional)",
      type: "text",
      rows: 3,
      description: "A short announcement shown above the sessions, such as a schedule change.",
    }),
    defineField({
      name: "links",
      title: "Class links (optional)",
      type: "array",
      description:
        "Links that stay useful all year, such as the class handbook or a shared folder.",
      of: [defineArrayMember({ type: "classLink" })],
    }),
    defineField({
      name: "title",
      title: "Class name",
      type: "string",
      description: "Set up by the site administrator. Leave as is.",
      validation: (rule) => rule.required().error("Add the class name."),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "Fixed when the class was created, so saved links keep working.",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Section",
      type: "string",
      description: "Set up by the site administrator. Leave as is.",
      options: { list: GROUP_OPTIONS, layout: "radio" },
      validation: (rule) => rule.required().error("Pick a section."),
    }),
    defineField({
      name: "sortOrder",
      title: "Order",
      type: "number",
      description: "Set up by the site administrator. Lowest number is listed first.",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title", group: "group", sessions: "sessions" },
    prepare: ({ title, group, sessions }) => ({
      title: title || "Untitled class",
      subtitle: [getGroupTitle(group), describeSessions(sessions)].filter(Boolean).join(" · "),
    }),
  },
});
