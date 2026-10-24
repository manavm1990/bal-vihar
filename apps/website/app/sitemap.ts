import { SITE_URL } from "@lib/constants";
import type { MetadataRoute } from "next";

const ROUTES = [
  "/",
  "/about-us",
  "/about-us/administrative-team",
  "/about-us/community-outreach",
  "/about-us/history",
  "/about-us/policies-procedures",
  "/admin-resources",
  "/admin-resources/print-request",
  "/admissions",
  "/calendar",
  "/disclaimer",
  "/education",
  "/education/about-india",
  "/education/class-schedule",
  "/education/class-webpages",
  "/education/curriculum",
  "/education/hindu-rituals",
  "/education/indian-heritage",
  "/education/teaching-faculty",
  "/education/temples-of-india",
  "/expense-reimbursement",
  "/giving",
  "/grievance",
  "/new-families",
  "/photos",
  "/presidents-message",
  "/privacy",
  "/questions",
  "/terms",
  "/volunteering",
  "/volunteering/impact-award",
  "/volunteering/volunteers",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified,
  }));
}
