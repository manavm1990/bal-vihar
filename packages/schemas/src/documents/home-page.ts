import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Urgent notices",
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
      name: "announcements",
      title: "Notices",
      type: "array",
      description:
        "For urgent news only: for example, classes are cancelled because of weather, or registration is now open. Each notice appears in a large card at the very top of the home page. Leave this empty when there is nothing urgent. To take a notice down, turn off “Show on the site” or set “Show until”.",
      of: [
        defineArrayMember({
          type: "object",
          name: "announcement",
          validation: (rule) =>
            rule.custom((value) => {
              if (!isRecord(value)) return true;

              const label = readTrimmedString(value["ctaLabel"]);
              const href = readTrimmedString(value["ctaHref"]);
              if ((label && !href) || (!label && href))
                return "Add both button text and button link, or clear both.";

              const startDate = readTrimmedString(value["startDate"]);
              const endDate = readTrimmedString(value["endDate"]);
              if (startDate && endDate && endDate < startDate)
                return '"Show until" must be after "Show from".';

              return true;
            }),
          fields: [
            defineField({
              name: "title",
              title: "Headline",
              type: "string",
              validation: (rule) => rule.required().error("Add a headline."),
            }),
            defineField({
              name: "body",
              title: "Message",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().error("Add the message text."),
            }),
            defineField({
              name: "ctaLabel",
              title: "Button text (optional)",
              type: "string",
              description: 'e.g. "Register now". Leave blank for no button.',
            }),
            defineField({
              name: "ctaHref",
              title: "Button link (optional)",
              type: "url",
              description: "Website path (/calendar) or full https link.",
              validation: (rule) =>
                rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
            }),
            defineField({
              name: "isActive",
              title: "Show on the site",
              type: "boolean",
              description: "Turn off to keep this notice saved but hidden.",
              initialValue: true,
            }),
            defineField({
              name: "startDate",
              title: "Show from (optional)",
              type: "datetime",
              description: "Leave empty to start showing right away (when turned on).",
            }),
            defineField({
              name: "endDate",
              title: "Show until (optional)",
              type: "datetime",
              description: "Leave empty to keep showing until you turn it off.",
            }),
            defineField({
              name: "tone",
              title: "Notice style",
              type: "string",
              description:
                "Pick Urgent for a cancellation. Pick Good news for registration opening.",
              options: {
                list: [
                  { title: "Information (orange)", value: "default" },
                  { title: "Urgent: cancellation or weather (red)", value: "urgent" },
                  { title: "Good news: registration is open (green)", value: "success" },
                ],
                layout: "radio",
              },
              initialValue: "default",
            }),
          ],
          preview: {
            select: {
              title: "title",
              isActive: "isActive",
              tone: "tone",
            },
            prepare({ title, isActive, tone }) {
              const style =
                tone === "urgent" ? "Urgent" : tone === "success" ? "Good news" : "Information";
              return {
                title: title || "Notice",
                subtitle: `${isActive === false ? "Hidden" : "Visible"} · ${style}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Urgent notices" };
    },
  },
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";
