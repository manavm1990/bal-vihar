import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const albumPhoto = defineType({
  name: "albumPhoto",
  title: "Photo",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Short description (optional)",
      type: "string",
      description:
        'What is in the photo, for accessibility. Left empty, the site describes it as "Gallery name, photo 3".',
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "Only if you want text shown with the photo on the site.",
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
        title: caption || alt || "Photo",
        subtitle: alt && caption ? alt : undefined,
        media,
      };
    },
  },
});
