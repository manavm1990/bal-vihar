import { calendarEvent } from "./documents/calendar-event";
import { calendarImport } from "./documents/calendar-import";
import { event } from "./documents/event";
import { homePage } from "./documents/home-page";
import { PHOTO_PAGE_OPTIONS, photoGallery } from "./documents/photo-gallery";
import { siteSettings } from "./documents/site-settings";
import { mediaImage } from "./objects/media-image";

/** Fixed document IDs for Studio singletons. */
export const SINGLETON_IDS = {
  homePage: "homePage",
  photoGallery: "photoGallery",
  siteSettings: "siteSettings",
} as const;

export const SINGLETON_TYPES = Object.keys(SINGLETON_IDS) as (keyof typeof SINGLETON_IDS)[];

/** All Sanity schema types shared by Studio (and typed consumers). */
export const schemaTypes = [
  mediaImage,
  homePage,
  photoGallery,
  siteSettings,
  calendarEvent,
  calendarImport,
  event,
];

export {
  calendarEvent,
  calendarImport,
  event,
  homePage,
  mediaImage,
  PHOTO_PAGE_OPTIONS,
  photoGallery,
  siteSettings,
};
