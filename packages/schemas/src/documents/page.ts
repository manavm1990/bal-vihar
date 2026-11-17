import { DocumentIcon } from "@sanity/icons/Document";
import { defineArrayMember, defineField, defineType, getPublishedId } from "sanity";
import { createBodyBlock } from "../objects/page-blocks";
import { HEADER_MENUS, RESERVED_SLUGS } from "../route-config";

const API_VERSION = "2025-01-01";
const NO_MENU = "none";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const MENU_OPTIONS = [
  ...HEADER_MENUS.map((menu) => ({ title: menu, value: menu })),
  { title: "Not in the menu", value: NO_MENU },
];

const getToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

const isInMenu = (menu: unknown) => typeof menu === "string" && menu !== NO_MENU;

const isReserved = (slug: string) => RESERVED_SLUGS.some((reserved) => reserved === slug);

export const page = defineType({
  name: "page",
  title: "Custom page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The page lives at balvihar-stlouis.com/this-address. Pick it once; links to it break if you change it.",
      options: { source: "title" },
      validation: (rule) =>
        rule.required().custom((value) => {
          const slug = value?.current;
          if (!slug) return true;
          if (!SLUG_PATTERN.test(slug))
            return "Use lowercase letters, numbers and single dashes only, like diwali-2026.";

          return isReserved(slug) ? "That address is already used by the site." : true;
        }),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "One or two sentences. Shown in search results and when the page is shared.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "event",
      title: "Calendar event (optional)",
      type: "reference",
      description:
        "Is this page about an event on the calendar? Its date, time and place are then shown on the page, and the event links back here.",
      to: [{ type: "calendarEvent" }],
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value?._ref || !context.document) return true;

          const publishedId = getPublishedId(context.document._id);
          const others = await context
            .getClient({ apiVersion: API_VERSION })
            .fetch<number>(
              `count(*[_type == "page" && event._ref == $event && !(_id in [$published, $draft])])`,
              { event: value._ref, published: publishedId, draft: `drafts.${publishedId}` },
            );

          return others > 0 ? "Another page already uses this event." : true;
        }),
    }),
    defineField({
      name: "showUntil",
      title: "Show until (optional)",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description:
        "After this date the page leaves the menu, search and sitemap, but its address keeps working with a “This has passed” note. If you leave this empty and pick a calendar event, the event date is used.",
    }),
    defineField({
      name: "menu",
      title: "Show in the header menu (optional)",
      type: "string",
      description: "Pages not in a menu are reached by link, search and the sitemap.",
      options: { list: MENU_OPTIONS, layout: "radio" },
    }),
    defineField({
      name: "menuLabel",
      title: "Menu label (optional)",
      type: "string",
      description: "Defaults to the page title.",
      hidden: ({ document }) => !isInMenu(document?.["menu"]),
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        createBodyBlock(),
        defineArrayMember({ type: "mediaImage" }),
        defineArrayMember({ type: "pageCallout" }),
        defineArrayMember({ type: "pageCards" }),
        defineArrayMember({ type: "pageAccordion" }),
        defineArrayMember({ type: "pageButton" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      menu: "menu",
      showUntil: "showUntil",
      eventDate: "event.date",
    },
    prepare: ({ title, slug, menu, showUntil, eventDate }) => {
      const endsOn: string | undefined = showUntil ?? eventDate;
      const status = !endsOn ? null : endsOn < getToday() ? "archived" : `until ${endsOn}`;

      return {
        title: title || "Untitled page",
        subtitle: [slug ? `/${slug}` : null, isInMenu(menu) ? menu : null, status]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
