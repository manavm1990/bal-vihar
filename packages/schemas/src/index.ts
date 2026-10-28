import { calendarEvent } from "./documents/calendar-event";
import { calendarImport } from "./documents/calendar-import";
import { classPage } from "./documents/class-page";
import { faqs } from "./documents/faqs";
import { homePage } from "./documents/home-page";
import { impactAward } from "./documents/impact-award";
import { photoAlbum } from "./documents/photo-album";
import { PHOTO_PAGE_OPTIONS, photoGallery } from "./documents/photo-gallery";
import { policies } from "./documents/policies";
import { siteSettings } from "./documents/site-settings";
import { teachingFaculty } from "./documents/teaching-faculty";
import { volunteerRoster } from "./documents/volunteer-roster";
import { volunteersList } from "./documents/volunteers-list";
import { albumPhoto } from "./objects/album-photo";
import { classLink } from "./objects/class-link";
import { mediaImage } from "./objects/media-image";
import { youthAssistant } from "./objects/youth-assistant";

export const SINGLETON_IDS = {
  faqs: "faqs",
  homePage: "homePage",
  impactAward: "impactAward",
  photoGallery: "photoGallery",
  policies: "policies",
  siteSettings: "siteSettings",
  teachingFaculty: "teachingFaculty",
  volunteerRoster: "volunteerRoster",
  volunteersList: "volunteersList",
} as const;

// `Object.keys` widens to `string[]`; the keys come from the `as const` object above.
export const SINGLETON_TYPES = Object.keys(SINGLETON_IDS) as (keyof typeof SINGLETON_IDS)[];

export const schemaTypes = [
  albumPhoto,
  calendarEvent,
  calendarImport,
  classLink,
  classPage,
  faqs,
  homePage,
  impactAward,
  mediaImage,
  photoAlbum,
  photoGallery,
  policies,
  siteSettings,
  teachingFaculty,
  volunteerRoster,
  volunteersList,
  youthAssistant,
];

export {
  albumPhoto,
  calendarEvent,
  calendarImport,
  classLink,
  classPage,
  faqs,
  homePage,
  impactAward,
  mediaImage,
  PHOTO_PAGE_OPTIONS,
  photoAlbum,
  photoGallery,
  policies,
  siteSettings,
  teachingFaculty,
  volunteerRoster,
  volunteersList,
  youthAssistant,
};
