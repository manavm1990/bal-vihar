import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const classLink = defineType({
  name: "classLink",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Link text",
      type: "string",
      description: 'What parents will click, e.g. "Class slides" or "Worksheet (PDF)".',
      validation: (rule) => rule.required().error("Add the link text."),
    }),
    defineField({
      name: "url",
      title: "Web address",
      type: "url",
      description:
        "Paste the full address (Google Doc, slides, PDF…). It must start with https://.",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https"] })
          .error("Paste a full web address that starts with https://"),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
