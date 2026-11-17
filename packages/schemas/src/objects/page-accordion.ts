import { ChevronDownIcon } from "@sanity/icons/ChevronDown";
import { defineArrayMember, defineField, defineType } from "sanity";
import { createSimpleBlock } from "./page-blocks";

export const pageAccordion = defineType({
  name: "pageAccordion",
  title: "Expandable questions",
  type: "object",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "pageAccordionItem",
          title: "Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Text shown when opened",
              type: "array",
              of: [createSimpleBlock()],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }: { items?: unknown[] }) => ({
      title: "Expandable questions",
      subtitle: `${items?.length ?? 0} items`,
    }),
  },
});
