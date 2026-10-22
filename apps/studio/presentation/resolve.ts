import { defineLocations } from "sanity/presentation";

/**
 * Where each document type appears on the website —
 * used by Presentation navigation.
 */
export const resolve = {
  locations: {
    calendarEvent: defineLocations({
      select: { title: "title", date: "date" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `Calendar · ${doc.title}` : "Calendar",
            href: "/calendar",
          },
          { title: "Home · upcoming events", href: "/" },
        ],
      }),
    }),
    homePage: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Home page", href: "/" }],
      }),
    }),
    photoGallery: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [
          { title: "Photos page", href: "/photos" },
          { title: "Home · photo strip", href: "/" },
        ],
      }),
    }),
    siteSettings: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Home page", href: "/" }],
      }),
    }),
  },
};
