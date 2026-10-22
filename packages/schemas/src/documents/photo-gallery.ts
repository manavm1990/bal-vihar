import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Site pages that can show a gallery photo as their banner. */
export const PHOTO_PAGE_OPTIONS = [
  { title: "About Us: History", value: "/about-us/history" },
  { title: "About Us: Community Outreach", value: "/about-us/community-outreach" },
  { title: "Admissions", value: "/admissions" },
  { title: "Education", value: "/education" },
  { title: "Education: Curriculum K-7", value: "/education/curriculum-k-7" },
  { title: "Volunteering", value: "/volunteering" },
];

export const photoGallery = defineType({
  name: "photoGallery",
  title: "Photo Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Photo Gallery",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description: "Upload community photos here. Every photo needs an image and alt text.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryPhoto",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'e.g. "Diwali", "CANstruction", "Annual Day"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "schoolYear",
              title: "School year / label",
              type: "string",
              description: 'e.g. "2025-26" or "2015"',
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Optional editor note (not always shown on the site)",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "mediaImage",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "pages",
              title: "Show as banner on pages",
              type: "array",
              description:
                "Optional. Use this photo as the banner at the top of these pages. If several photos match a page, the first one is used.",
              of: [defineArrayMember({ type: "string" })],
              options: { list: PHOTO_PAGE_OPTIONS },
            }),
            defineField({
              name: "featured",
              title: "Featured on home",
              type: "boolean",
              description: "When true, eligible for the home photo board",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "title",
              schoolYear: "schoolYear",
              media: "image",
              hasAsset: "image.asset",
              featured: "featured",
            },
            prepare({ title, schoolYear, media, hasAsset, featured }) {
              const status = hasAsset ? "Has image" : "Needed";
              const home = featured === false ? " · hidden from home" : "";
              return {
                title: title || "Photo",
                subtitle: `${schoolYear || "Year TBD"} · ${status}${home}`,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Photo Gallery" };
    },
  },
});
