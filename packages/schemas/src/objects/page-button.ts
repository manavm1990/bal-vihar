import { LaunchIcon } from "@sanity/icons/Launch";
import { defineField, defineType } from "sanity";
import { createLinkRules } from "./link-annotation";

export const pageButton = defineType({
  name: "pageButton",
  title: "Link button",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Button link",
      type: "url",
      description: "Use /calendar for pages on this site, or a full https:// link.",
      validation: (rule) => [rule.required(), ...createLinkRules(rule)],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
