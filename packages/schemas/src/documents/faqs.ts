import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineArrayMember, defineField, defineType } from "sanity";
import { LINK_ANNOTATION } from "../objects/link-annotation";

const faqAnswer = () => [
  defineArrayMember({
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [{ title: "Bullet list", value: "bullet" }],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
      ],
      annotations: [LINK_ANNOTATION],
    },
  }),
];

export const faqs = defineType({
  name: "faqs",
  title: "Questions & Answers",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Questions and answers",
      type: "array",
      description:
        "Shown on the Questions & Contact page, in this order, and searchable on the site. Drag to reorder. Add a new question at the bottom or anywhere in the list.",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "Question",
          type: "object",
          icon: HelpCircleIcon,
          fields: [
            defineField({
              name: "question",
              type: "string",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "answer",
              type: "array",
              of: faqAnswer(),
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Questions & Answers" };
    },
  },
});
