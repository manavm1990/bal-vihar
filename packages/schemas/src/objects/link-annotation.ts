import { defineArrayMember, defineField } from "sanity";

export const LINK_SCHEMES = ["http", "https", "mailto", "tel"];

export const LINK_ANNOTATION = defineArrayMember({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      description: "Use /about-us/history for pages on this site, or a full https:// link.",
      validation: (rule) => rule.required().uri({ allowRelative: true, scheme: LINK_SCHEMES }),
    }),
  ],
});
