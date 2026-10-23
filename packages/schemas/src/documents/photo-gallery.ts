import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Site pages that can show a gallery photo as their banner. */
export const PHOTO_PAGE_OPTIONS = [
  { title: "About Us → History", value: "/about-us/history" },
  { title: "About Us → Community Outreach", value: "/about-us/community-outreach" },
  { title: "Admissions", value: "/admissions" },
  { title: "Education", value: "/education" },
  // The value is the key already stored on photos, from when Curriculum K–7 was its own page.
  { title: "Education → Curriculum", value: "/education/curriculum-k-7" },
  { title: "Volunteering", value: "/volunteering" },
];

export const photoGallery = defineType({
  name: "photoGallery",
  title: "Photos",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Photo Gallery",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description:
        "Add photos one at a time. Every photo needs a picture and a short description. Use Preview to check crop before Publish.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryPhoto",
          fields: [
            defineField({
              name: "title",
              title: "Name",
              type: "string",
              description: 'Short name, e.g. "Diwali" or "CANstruction"',
              validation: (rule) => rule.required().error("Give the photo a name."),
            }),
            defineField({
              name: "schoolYear",
              title: "School year",
              type: "string",
              description: 'e.g. "2025-26"',
            }),
            defineField({
              name: "note",
              title: "Private note",
              type: "string",
              description: "Only for editors — not shown on the website.",
            }),
            defineField({
              name: "image",
              title: "Picture",
              type: "mediaImage",
              description:
                "Upload the photo, then drag the focus point (hotspot) so faces stay in frame when cropped.",
              validation: (rule) => rule.required().error("Upload a picture before publishing."),
            }),
            defineField({
              name: "featured",
              title: "Show on the home page",
              type: "boolean",
              description:
                "Turn on to include this photo in the home page strip (when it has a picture).",
              initialValue: true,
            }),
            defineField({
              name: "pages",
              title: "Also use as page banner",
              type: "array",
              description:
                "Optional. Pick pages that should show this photo at the top. If two photos pick the same page, the first one in this list wins.",
              of: [defineArrayMember({ type: "string" })],
              options: { list: PHOTO_PAGE_OPTIONS },
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
              const bits = [
                schoolYear || "Year not set",
                hasAsset ? "Ready" : "Needs picture",
                featured === false ? "Hidden from home" : "On home",
              ];
              return {
                title: title || "Photo",
                subtitle: bits.join(" · "),
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
      return { title: "Photos" };
    },
  },
});
