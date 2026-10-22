import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "announcements", title: "Banners", default: true },
    { name: "hero", title: "Hero photos" },
    { name: "about", title: "About text" },
  ],
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
      title: "Home banners",
      type: "array",
      group: "announcements",
      description:
        "Snow days, registration open/close, and other urgent notes. Leave empty if nothing special is going on. Preview on the site before Publish.",
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
              description: "Turn off to keep this banner saved but hidden.",
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
              title: "Banner style",
              type: "string",
              description: "How strong the banner should look.",
              options: {
                list: [
                  { title: "Normal", value: "default" },
                  { title: "Urgent (cancellation / weather)", value: "urgent" },
                  { title: "Good news", value: "success" },
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
                tone === "urgent" ? "Urgent" : tone === "success" ? "Good news" : "Normal";
              return {
                title: title || "Banner",
                subtitle: `${isActive === false ? "Hidden" : "Visible"} · ${style}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "heroSlides",
      title: "Hero photos",
      type: "array",
      group: "hero",
      description:
        "Optional large photos at the bottom of the home page. Keep it to a few. Empty is fine — the carousel hides itself.",
      validation: (rule) => rule.max(6).error("Use at most 6 hero photos."),
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({
              name: "image",
              title: "Picture",
              type: "mediaImage",
              description: "Drag the focus point so important parts are not cropped.",
              validation: (rule) => rule.required().error("Upload a picture."),
            }),
            defineField({
              name: "link",
              title: "Optional link when clicked",
              type: "url",
              description: "Website path (/calendar) or full https link.",
              validation: (rule) =>
                rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
            }),
          ],
          preview: {
            select: {
              title: "image.caption",
              alt: "image.alt",
              media: "image",
            },
            prepare({ title, alt, media }) {
              return {
                title: title || alt || "Hero photo",
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "whoWeAre",
      title: "“Who we are” blurb (optional)",
      type: "text",
      rows: 5,
      group: "about",
      description:
        "Only fill this in to replace the default intro paragraph on the home page. Most of the time, leave it blank.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";
