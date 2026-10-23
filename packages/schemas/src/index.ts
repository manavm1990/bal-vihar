import { calendarEvent } from "./documents/calendar-event";
import { calendarImport } from "./documents/calendar-import";
import { classPage } from "./documents/class-page";
import { homePage } from "./documents/home-page";
import { person } from "./documents/person";
import { PHOTO_PAGE_OPTIONS, photoGallery } from "./documents/photo-gallery";
import { policies } from "./documents/policies";
import { siteSettings } from "./documents/site-settings";
import { teachingFaculty } from "./documents/teaching-faculty";
import { volunteersList } from "./documents/volunteers-list";
import { classLink } from "./objects/class-link";
import { mediaImage } from "./objects/media-image";
import { youthAssistant } from "./objects/youth-assistant";

/**
 * Fixed document IDs for Studio singletons.
 */
export const SINGLETON_IDS = {
  homePage: "homePage",
  photoGallery: "photoGallery",
  policies: "policies",
  siteSettings: "siteSettings",
  teachingFaculty: "teachingFaculty",
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
  person,
  photoGallery,
  policies,
  siteSettings,
  teachingFaculty,
  volunteersList,
  youthAssistant,
];

export {
  calendarEvent,
  calendarImport,
  classLink,
  classPage,
  homePage,
  mediaImage,
  PHOTO_PAGE_OPTIONS,
  person,
  photoGallery,
  policies,
  siteSettings,
  teachingFaculty,
  volunteersList,
  youthAssistant,
};
