import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero photos" },
    { name: "announcements", title: "Announcements" },
    { name: "about", title: "About blurb" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Home Page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "mediaImage",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "link",
              title: "Optional link",
              type: "url",
              description: "Internal path (/calendar) or external URL",
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
                title: title || alt || "Hero slide",
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "announcements",
      title: "Announcements",
      type: "array",
      group: "announcements",
      description:
        "Registration windows, weather cancellations, and other home banners. Empty start/end means always eligible when active.",
      of: [
        defineArrayMember({
          type: "object",
          name: "announcement",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "ctaLabel",
              title: "CTA label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "CTA link",
              type: "url",
              validation: (rule) =>
                rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
            }),
            defineField({
              name: "isActive",
              title: "Active",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "startDate",
              title: "Show from",
              type: "datetime",
            }),
            defineField({
              name: "endDate",
              title: "Show until",
              type: "datetime",
            }),
            defineField({
              name: "tone",
              title: "Tone",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Urgent / cancellation", value: "urgent" },
                  { title: "Success", value: "success" },
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
              return {
                title: title || "Announcement",
                subtitle: `${isActive ? "Active" : "Inactive"}${tone ? ` • ${tone}` : ""}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "whoWeAre",
      title: "Who we are",
      type: "text",
      rows: 5,
      group: "about",
      description: "Optional short blurb under announcements",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
