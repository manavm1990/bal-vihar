import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";

const DATE_NOTE = "Leave blank until confirmed. The page then says “To be announced”.";

const dateField = (name: string, title: string, example: string) =>
  defineField({
    name,
    title,
    type: "string",
    description: `For example “${example}”. ${DATE_NOTE}`,
  });

const hoursFields = () => [
  defineField({
    name: "teens",
    title: "Teens (11–15)",
    type: "string",
    description: 'For example "50–74" or "100+".',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "youngAdults",
    title: "Young adults (16–25)",
    type: "string",
    description: 'For example "100–174" or "250+".',
    validation: (rule) => rule.required(),
  }),
];

const cell = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (rule) => rule.required() });

export const impactAward = defineType({
  name: "impactAward",
  title: "Impact Award",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Impact Award",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "awardYear",
      title: "Award year",
      type: "string",
      description: `For example “2026–27”. Shown under the page title. ${DATE_NOTE}`,
    }),
    defineField({
      name: "dates",
      title: "Key dates",
      type: "object",
      description:
        "Update these every year. Each one is optional, and any you leave blank show as “To be announced”.",
      options: { collapsible: false },
      fields: [
        dateField("trackingStart", "Tracking starts", "April 1"),
        dateField("trackingEnd", "Tracking ends", "March 31"),
        dateField("intent", "Tell us you plan to apply by", "September 30"),
        dateField("touchpointOne", "Touchpoint meeting 1", "Late September"),
        dateField("touchpointTwo", "Touchpoint meeting 2", "Early March"),
        dateField("apply", "Applications due", "April 6"),
        dateField("awards", "Awards presented", "May/June"),
      ],
    }),
    defineField({
      name: "coordinator",
      title: "Award coordinator",
      type: "object",
      description:
        "Who families contact with questions. Shown at the bottom of the page. Confirm each year.",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "role",
          title: "Role",
          type: "string",
          description: 'For example "B-VISION Impact Award Coordinator".',
        }),
        defineField({
          name: "email",
          title: "Public email",
          type: "string",
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: "phone",
          title: "Public phone",
          type: "string",
          description: "Include the area code, e.g. 636-634-1900.",
          validation: (rule) =>
            rule.regex(/^\+?[\d ()-]*\d[\d ()-]*$/).error("Enter a phone number."),
        }),
      ],
    }),
    defineField({
      name: "tiers",
      title: "Hours for each award level",
      type: "object",
      description: "From the 2025–26 slides. Confirm they still apply each year.",
      options: { collapsible: false },
      fields: [
        defineField({ name: "bronze", title: "Bronze", type: "object", fields: hoursFields() }),
        defineField({ name: "silver", title: "Silver", type: "object", fields: hoursFields() }),
        defineField({ name: "gold", title: "Gold", type: "object", fields: hoursFields() }),
      ],
    }),
    defineField({
      name: "teachingHours",
      title: "Teaching hours",
      type: "array",
      description:
        "One row per activity. The 2025–26 guidelines disagree on how many classes Bhajan, Yoga and Art youth lead (“4–5” and “8–10”, against 5 and 8 in their table). Confirm which is right.",
      of: [
        defineArrayMember({
          name: "teachingHoursRow",
          title: "Activity",
          type: "object",
          fields: [
            cell("activity", "Activity"),
            cell("classesY4", "Classes to lead (Y4)"),
            cell("classesY5", "Classes to lead (Y5)"),
            cell("prepHours", "Prep hours per class taught"),
            cell("presentingHours", "Presenting hours per class"),
            cell("attendedHours", "Hours per class attended without teaching"),
          ],
          preview: { select: { title: "activity" } },
        }),
      ],
    }),
    defineField({
      name: "communityIntro",
      title: "Community projects: introduction",
      type: "text",
      rows: 4,
      description: "Shown above the table of community projects.",
    }),
    defineField({
      name: "communityProjects",
      title: "Community projects",
      type: "array",
      description:
        "The projects change every year, so replace the rows with this year's. Use — for no hours.",
      of: [
        defineArrayMember({
          name: "communityProjectRow",
          title: "Project",
          type: "object",
          fields: [
            cell("project", "Project"),
            cell("participating", "Hours for participating"),
            cell("onTheTeam", "Hours on the team"),
            cell("leading", "Hours for leading the project"),
          ],
          preview: { select: { title: "project" } },
        }),
      ],
    }),
    defineField({
      name: "downloads",
      title: "Tracking sheet and templates",
      type: "array",
      description:
        "Links to the shared documents. The first one is also the “Tracking sheet” button at the top. Confirm what the second proof sample is.",
      of: [
        defineArrayMember({
          name: "awardDownload",
          title: "Download",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "description", title: "What it is for", type: "string" }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "description" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { year: "awardYear" },
    prepare: ({ year }) => ({ title: "Impact Award", subtitle: year }),
  },
});
