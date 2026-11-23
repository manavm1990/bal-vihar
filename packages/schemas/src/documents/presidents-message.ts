import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";
import { LINK_ANNOTATION } from "../objects/link-annotation";

export const presidentsMessage = defineType({
  name: "presidentsMessage",
  title: "President's Message",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Shown above the message. Change it whenever you post a new message.",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required().error("Pick the date of the message."),
    }),
    defineField({
      name: "body",
      title: "Message",
      type: "array",
      description:
        "Write or paste the message. Use the list button for a list of highlights and B for bold.",
      of: [
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
      ],
      validation: (rule) => rule.required().min(1).error("Add the message."),
    }),
    defineField({
      name: "signedBy",
      title: "Signed by",
      type: "string",
      description: 'Shown under "Best Regards," at the end.',
      validation: (rule) => rule.required().error("Add the president's name."),
    }),
  ],
  preview: {
    select: { date: "date" },
    prepare: ({ date }) => ({
      title: "President's Message",
      subtitle: typeof date === "string" ? date : undefined,
    }),
  },
});
