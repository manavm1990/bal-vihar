import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const mediaImage = defineType({
  name: "mediaImage",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Short description (required)",
      type: "string",
      description:
        'What is in the photo, for accessibility. Example: "Students lighting diyas at Diwali".',
      validation: (rule) =>
        rule.required().error("Add a short description so the photo can be published."),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "Only if you want text shown with the image on the site.",
    }),
  ],
  preview: {
    select: {
      alt: "alt",
      caption: "caption",
      media: "asset",
    },
    prepare({ alt, caption, media }) {
      return {
        title: caption || alt || "Image",
        subtitle: alt && caption ? alt : undefined,
        media,
      };
    },
  },
});
