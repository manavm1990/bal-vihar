import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

const describePhotoCount = (photos: unknown) => {
  const count = Array.isArray(photos) ? photos.length : 0;

  return `${count} ${count === 1 ? "photo" : "photos"}`;
};

export const photoAlbum = defineType({
  name: "photoAlbum",
  title: "Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Gallery name",
      type: "string",
      description: 'e.g. "Diwali 2026"',
      validation: (rule) => rule.required().error("Give the gallery a name."),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "Click Generate. It becomes the end of the gallery's web address.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required().error("Click Generate to make the web address."),
    }),
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description: 'e.g. "2026-27". The newest school year is listed first.',
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description:
        "Select all the photos for this gallery and drag them onto this list at once. The first photo is the cover. Drag a photo to move it.",
      of: [defineArrayMember({ type: "albumPhoto" })],
      options: { layout: "grid" },
      validation: (rule) => rule.required().min(1).error("Add at least one photo."),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [
        { field: "schoolYear", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", schoolYear: "schoolYear", photos: "photos", media: "photos.0.asset" },
    prepare: ({ title, schoolYear, photos, media }) => ({
      title: title || "Untitled gallery",
      subtitle: [schoolYear, describePhotoCount(photos)].filter(Boolean).join(" · "),
      media,
    }),
  },
});
