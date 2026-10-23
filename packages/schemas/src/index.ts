import { calendarEvent } from "./documents/calendar-event";
import { calendarImport } from "./documents/calendar-import";
import { classPage } from "./documents/class-page";
import { homePage } from "./documents/home-page";
import { PHOTO_PAGE_OPTIONS, photoGallery } from "./documents/photo-gallery";
import { policies } from "./documents/policies";
import { siteSettings } from "./documents/site-settings";
import { volunteersList } from "./documents/volunteers-list";
import { classLink } from "./objects/class-link";
import { mediaImage } from "./objects/media-image";

/**
 * Fixed document IDs for Studio singletons.
 */
export const SINGLETON_IDS = {
  homePage: "homePage",
  photoGallery: "photoGallery",
  policies: "policies",
  siteSettings: "siteSettings",
  volunteersList: "volunteersList",
} as const;

export const SINGLETON_TYPES = Object.keys(SINGLETON_IDS) as (keyof typeof SINGLETON_IDS)[];

/**
 * All Sanity schema types shared by Studio (and typed consumers).
 */
export const schemaTypes = [
  calendarEvent,
  calendarImport,
  classLink,
  classPage,
  homePage,
  mediaImage,
  photoGallery,
  policies,
  siteSettings,
  volunteersList,
];

export {
  calendarEvent,
  calendarImport,
  classLink,
  classPage,
  homePage,
  mediaImage,
  PHOTO_PAGE_OPTIONS,
  photoGallery,
  policies,
  siteSettings,
  volunteersList,
};
