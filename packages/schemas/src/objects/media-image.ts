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
      title: "Alternative text",
      type: "string",
      description: "Describe the image for accessibility and SEO.",
      validation: (rule) => rule.required().warning("Alt text is important for accessibility"),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
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
