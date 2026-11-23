import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";
import { createLinkRules } from "./link-annotation";

export const pageCards = defineType({
  name: "pageCards",
  title: "Cards",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "pageCard",
          title: "Card",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "url",
              description: "Use /calendar for pages on this site, or a full https:// link.",
              validation: createLinkRules,
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { cards: "cards" },
    prepare: ({ cards }: { cards?: unknown[] }) => ({
      title: "Cards",
      subtitle: `${cards?.length ?? 0} cards`,
    }),
  },
});
