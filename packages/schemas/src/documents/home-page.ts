import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { defineField, defineType } from "sanity";
import { createLinkRules } from "../objects/link-annotation";
import { getToday } from "../school-years";

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
      validation: (rule) => [
        ...createLinkRules(rule),
        rule.custom((value, { document }) =>
          !value && document?.["noticeLabel"] ? "Add the link, or clear the link text." : true,
        ),
      ],
    }),
    defineField({
      name: "noticeLabel",
      title: "Notice link text (optional)",
      type: "string",
      description: 'Example: "View calendar". Add this alongside a notice link.',
      validation: (rule) =>
        rule.custom((value, { document }) =>
          !value && document?.["noticeHref"] ? "Add the text people click for the link." : true,
        ),
    }),
    defineField({
      name: "noticeUntil",
      title: "Show until",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description:
        "Last day the notice shows. After that the next class or event shows again automatically, so nobody has to remember to clear it.",
      hidden: ({ document }) => !document?.["noticeText"],
      validation: (rule) => [
        rule.custom((value, { document }) =>
          !value && document?.["noticeText"] ? "Pick the last day this notice should show." : true,
        ),
        rule
          .custom((value) =>
            !value || value >= getToday()
              ? true
              : "This day has passed, so the notice isn't showing. Pick a later day or clear the notice.",
          )
          .warning(),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
