import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      initialValue: "Bal Vihar of St. Louis",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      description: "Default link for registration CTAs",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph image",
      type: "mediaImage",
    }),
    defineField({
      name: "contactEmail",
      title: "Public contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Site Settings" };
    },
  },
});
