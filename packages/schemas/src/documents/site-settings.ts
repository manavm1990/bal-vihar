import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site name",
      type: "string",
      initialValue: "Bal Vihar of St. Louis",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration link",
      type: "url",
      description: "Where the Register buttons should send families.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default share image",
      type: "mediaImage",
      description: "Optional image used when a page is shared on social media.",
    }),
    defineField({
      name: "contactEmail",
      title: "Public contact email",
      type: "string",
      validation: (rule) => rule.email().error("Use a valid email address."),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Site settings" };
    },
  },
});
