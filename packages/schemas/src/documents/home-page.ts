import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Home Page",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "noticeText",
      title: "Short notice blurb",
      type: "string",
      description:
        "Optional override for the top utility bar. Leave blank to show the next upcoming class or event automatically.",
      validation: (rule) => rule.max(160).warning("Keep this short so the header stays compact."),
    }),
    defineField({
      name: "noticeHref",
      title: "Notice link (optional)",
      type: "url",
      description: "Website path (/calendar) or full https link.",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "noticeLabel",
      title: "Notice link text (optional)",
      type: "string",
      description: 'Example: "View calendar". Add this alongside a notice link.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
