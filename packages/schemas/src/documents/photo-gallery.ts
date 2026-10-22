import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

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
      description:
        "Upload community photos here. Leave the image empty to mark a slot as still needed.",
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
