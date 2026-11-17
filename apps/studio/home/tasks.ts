import { SINGLETON_IDS } from "@bv/schemas";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { UploadIcon } from "@sanity/icons/Upload";
import { UsersIcon } from "@sanity/icons/Users";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import type { ComponentType } from "react";
import type { SectionId } from "../roles";
import { UPLOADS } from "../templates";

export type TaskTarget =
  | { intent: "create"; params: { type: string } }
  | { intent: "edit"; params: { id: string; type: string; template?: string } }
  | { pane: string };

export interface Task {
  description: string;
  icon: ComponentType;
  section: SectionId;
  target: TaskTarget;
  title: string;
}

export const TASK_GROUPS: { title: string; tasks: Task[] }[] = [
  {
    title: "After each class",
    tasks: [
      {
        section: "classes",
        title: "Post a class update",
        description: "What you covered, homework and links for parents.",
        icon: BookIcon,
        target: { pane: "classes" },
      },
    ],
  },
  {
    title: "Now and then",
    tasks: [
      {
        section: "calendar",
        title: "Change the calendar",
        description: "Fix a time or place, or add a single event.",
        icon: CalendarIcon,
        target: { pane: "calendar" },
      },
      {
        section: "pages",
        title: "Make a page",
        description: "For an event or announcement that needs a page of its own.",
        icon: DocumentIcon,
        target: { intent: "create", params: { type: "page" } },
      },
      {
        section: "photos",
        title: "Add a photo gallery",
        description: "Drag in the photos from an event.",
        icon: ImagesIcon,
        target: { intent: "create", params: { type: "photoAlbum" } },
      },
      {
        section: "notice",
        title: "Post a header notice",
        description: "A short message at the top of every page, such as a closure.",
        icon: WarningOutlineIcon,
        target: { intent: "edit", params: { id: SINGLETON_IDS.homePage, type: "homePage" } },
      },
      {
        section: "banners",
        title: "Change banner photos",
        description: "The home page photo strip and the photos at the top of pages.",
        icon: ImageIcon,
        target: {
          intent: "edit",
          params: { id: SINGLETON_IDS.photoGallery, type: "photoGallery" },
        },
      },
    ],
  },
  {
    title: "Once a year",
    tasks: [
      {
        section: "calendar",
        title: "Upload the year's calendar",
        description: "Add every event from the calendar spreadsheet at once.",
        icon: UploadIcon,
        target: {
          intent: "edit",
          params: {
            id: UPLOADS.calendar.id,
            type: "spreadsheetImport",
            template: UPLOADS.calendar.template,
          },
        },
      },
      {
        section: "faculty",
        title: "Teaching Faculty",
        description: "Who teaches each group, bhajan and yoga.",
        icon: UsersIcon,
        target: {
          intent: "edit",
          params: { id: SINGLETON_IDS.teachingFaculty, type: "teachingFaculty" },
        },
      },
      {
        section: "eventVolunteers",
        title: "Event volunteers",
        description: "Who helped at each event, typed in or from a spreadsheet.",
        icon: UsersIcon,
        target: { pane: "eventVolunteers" },
      },
      {
        section: "adminTeam",
        title: "Administrative Team",
        description: "The teams that run Bal Vihar and who is on them.",
        icon: UsersIcon,
        target: {
          intent: "edit",
          params: { id: SINGLETON_IDS.volunteersList, type: "volunteersList" },
        },
      },
      {
        section: "impactAward",
        title: "Impact Award",
        description: "This year's dates, hours and coordinator.",
        icon: StarIcon,
        target: { intent: "edit", params: { id: SINGLETON_IDS.impactAward, type: "impactAward" } },
      },
      {
        section: "policies",
        title: "Policies & Procedures",
        description: "Review dates, fees and numbers for the new year.",
        icon: DocumentTextIcon,
        target: { intent: "edit", params: { id: SINGLETON_IDS.policies, type: "policies" } },
      },
      {
        section: "faqs",
        title: "Questions & Answers",
        description: "The questions parents ask most.",
        icon: HelpCircleIcon,
        target: { intent: "edit", params: { id: SINGLETON_IDS.faqs, type: "faqs" } },
      },
    ],
  },
];
