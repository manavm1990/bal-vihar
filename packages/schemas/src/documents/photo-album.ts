import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

const AUGUST = 8;
const FIRST_SCHOOL_YEAR = 2014;
const LAST_SCHOOL_YEAR = 2035;

const describePhotoCount = (photos: unknown) => {
  const count = Array.isArray(photos) ? photos.length : 0;

  return `${count} ${count === 1 ? "photo" : "photos"}`;
};

const formatSchoolYear = (start: number) => `${start}-${String(start + 1).slice(2)}`;

function getCurrentSchoolYear() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));

  return formatSchoolYear(month >= AUGUST ? year : year - 1);
}

const hasLinks = (value: unknown) => typeof value === "string" && value.trim().length > 0;

const hasPhotos = (value: unknown) => Array.isArray(value) && value.length > 0;

const hasSlug = (value: unknown) =>
  typeof value === "object" && value !== null && "current" in value && Boolean(value.current);

const SCHOOL_YEARS = Array.from({ length: LAST_SCHOOL_YEAR - FIRST_SCHOOL_YEAR + 1 }, (_, index) =>
  formatSchoolYear(LAST_SCHOOL_YEAR - index),
);

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
      description:
        "Click Generate once. After that it is locked, so links people already shared keep working.",
      options: { source: "title", maxLength: 80 },
      readOnly: ({ value }) => hasSlug(value),
      validation: (rule) => rule.required().error("Click Generate to make the web address."),
    }),
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description:
        "Starts as the current school year. Change it only for older photos. The newest year is listed first on the Photos page.",
      options: { list: SCHOOL_YEARS, layout: "dropdown" },
      initialValue: getCurrentSchoolYear,
      validation: (rule) => rule.required().error("Pick the school year."),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description:
        "Select all the photos for this gallery and drag them onto this list at once. Use JPEG or PNG files. The first photo is the cover, so drag the one you want to the front. If a face is cut off, open that photo and move its focus point.",
      of: [defineArrayMember({ type: "albumPhoto" })],
      options: { layout: "grid" },
      validation: (rule) =>
        rule.custom((photos, { document }) =>
          hasPhotos(photos) || hasLinks(document?.["pasteLinks"])
            ? true
            : "Add at least one photo, or paste some photo links below.",
        ),
    }),
    defineField({
      name: "pasteLinks",
      title: "Add photos from links",
      type: "text",
      rows: 4,
      description:
        "Paste one photo link per line, then click Publish. A minute or so later the photos appear in the list above. Each link must go straight to a picture: right-click the photo on a website and choose Copy image address.",
    }),
    defineField({
      name: "importReport",
      title: "Last link import",
      type: "text",
      rows: 3,
      readOnly: true,
      hidden: ({ value }) => !value,
      description: "What happened to the links you last pasted. Filled in automatically.",
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
