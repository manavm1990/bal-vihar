import { calendarEvent } from "./documents/calendar-event";
import { classPage } from "./documents/class-page";
import { faqs } from "./documents/faqs";
import { homePage } from "./documents/home-page";
import { impactAward } from "./documents/impact-award";
import { page } from "./documents/page";
import { photoAlbum } from "./documents/photo-album";
import { PHOTO_PAGE_OPTIONS, photoGallery } from "./documents/photo-gallery";
import { policies } from "./documents/policies";
import { presidentsMessage } from "./documents/presidents-message";
import { spreadsheetImport } from "./documents/spreadsheet-import";
import { studioAccess, studioMember } from "./documents/studio-access";
import { teachingFaculty } from "./documents/teaching-faculty";
import { volunteerRoster } from "./documents/volunteer-roster";
import { volunteersList } from "./documents/volunteers-list";
import { getViewAs, isAdministrator, isAdminView, VIEW_AS_KEY } from "./field-rules";
import { albumPhoto } from "./objects/album-photo";
import { classLink } from "./objects/class-link";
import { mediaImage } from "./objects/media-image";
import { pageAccordion } from "./objects/page-accordion";
import { pageButton } from "./objects/page-button";
import { pageCallout } from "./objects/page-callout";
import { pageCards } from "./objects/page-cards";
import { youthAssistant } from "./objects/youth-assistant";
import { HEADER_MENUS, RESERVED_SLUGS } from "./route-config";
import { getToday } from "./school-years";
import { isStudioRole, STUDIO_ROLES, type StudioRole } from "./studio-roles";

export const SINGLETON_IDS = {
  faqs: "faqs",
  homePage: "homePage",
  impactAward: "impactAward",
  photoGallery: "photoGallery",
  policies: "policies",
  presidentsMessage: "presidentsMessage",
  studioAccess: "studioAccess",
  teachingFaculty: "teachingFaculty",
  volunteerRoster: "volunteerRoster",
  volunteersList: "volunteersList",
} as const;

export const SINGLETON_TYPES = Object.keys(SINGLETON_IDS) as (keyof typeof SINGLETON_IDS)[];

export const schemaTypes = [
  albumPhoto,
  calendarEvent,
  classLink,
  classPage,
  faqs,
  homePage,
  impactAward,
  mediaImage,
  page,
  pageAccordion,
  pageButton,
  pageCallout,
  pageCards,
  photoAlbum,
  photoGallery,
  policies,
  presidentsMessage,
  spreadsheetImport,
  studioAccess,
  studioMember,
  teachingFaculty,
  volunteerRoster,
  volunteersList,
  youthAssistant,
] as const;

export {
  albumPhoto,
  calendarEvent,
  classLink,
  classPage,
  faqs,
  getToday,
  getViewAs,
  HEADER_MENUS,
  homePage,
  impactAward,
  isAdministrator,
  isAdminView,
  isStudioRole,
  mediaImage,
  PHOTO_PAGE_OPTIONS,
  page,
  pageAccordion,
  pageButton,
  pageCallout,
  pageCards,
  photoAlbum,
  photoGallery,
  policies,
  presidentsMessage,
  RESERVED_SLUGS,
  STUDIO_ROLES,
  type StudioRole,
  spreadsheetImport,
  studioAccess,
  studioMember,
  teachingFaculty,
  VIEW_AS_KEY,
  volunteerRoster,
  volunteersList,
  youthAssistant,
};
