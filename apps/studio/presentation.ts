/*
 * Maps each document type to the website pages that show it,
 * for the Presentation tool's "Used on" links.
 *
 * If `presentation.test.ts` fails on 🔗s that no longer exist,
 * update this mapping accordingly.
 */

import { defineLocations } from "sanity/presentation";

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
    faqs: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Questions & Contact", href: "/questions" }],
      }),
    }),
    homePage: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Home page", href: "/" }],
      }),
    }),
    impactAward: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [
          { title: "Impact Award", href: "/volunteering/impact-award" },
          { title: "Volunteering", href: "/volunteering" },
        ],
      }),
    }),
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug ? [{ title: doc.title ?? "Page", href: `/${doc.slug}` }] : [],
      }),
    }),
    photoAlbum: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              { title: doc.title ?? "Gallery", href: `/photos/${doc.slug}` },
              { title: "Photos page", href: "/photos" },
            ]
          : [{ title: "Photos page", href: "/photos" }],
      }),
    }),
    photoGallery: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Home · photo strip", href: "/" }],
      }),
    }),
    policies: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Policies & Procedures", href: "/about-us/policies-procedures" }],
      }),
    }),
    presidentsMessage: defineLocations({
      select: { title: "date" },
      resolve: () => ({
        locations: [{ title: "President's Message", href: "/presidents-message" }],
      }),
    }),
    teachingFaculty: defineLocations({
      select: { title: "schoolYear" },
      resolve: () => ({
        locations: [{ title: "Teaching Faculty", href: "/education/teaching-faculty" }],
      }),
    }),
    volunteerRoster: defineLocations({
      select: { title: "schoolYear" },
      resolve: () => ({
        locations: [{ title: "Event volunteers", href: "/volunteering/volunteers" }],
      }),
    }),
    volunteersList: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Administrative Team", href: "/about-us/administrative-team" }],
      }),
    }),
  },
};
