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
    classPage: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              { title: doc.title ?? "Class page", href: `/education/classes/${doc.slug}` },
              { title: "Class Webpages", href: "/education/class-webpages" },
            ]
          : [{ title: "Class Webpages", href: "/education/class-webpages" }],
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
    policies: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Policies & Procedures", href: "/about-us/policies-procedures" }],
      }),
    }),
    siteSettings: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Home page", href: "/" }],
      }),
    }),
    volunteersList: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Volunteers List", href: "/volunteering/volunteers-list" }],
      }),
    }),
  },
};
