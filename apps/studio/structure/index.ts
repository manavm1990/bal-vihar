import { SINGLETON_IDS } from "@bv/schemas";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { UsersIcon } from "@sanity/icons/Users";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import type { StructureResolver } from "sanity/structure";

/**
 * Idiot-proof desk: only what editors change week to week.
 * Legacy types stay in the schema for old data, but are not listed here.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Edit the website")
    .items([
      S.listItem()
        .title("Urgent notices")
        .icon(WarningOutlineIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId(SINGLETON_IDS.homePage)
            .title("Urgent notices"),
        ),
      S.listItem()
        .title("Photos")
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType("photoGallery")
            .documentId(SINGLETON_IDS.photoGallery)
            .title("Photos"),
        ),
      S.listItem()
        .title("Calendar")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("calendarEvent")
            .title("Calendar")
            .defaultOrdering([{ field: "date", direction: "asc" }]),
        ),
      S.listItem()
        .title("Classes")
        .icon(BookIcon)
        .child(
          S.documentTypeList("classPage")
            .title("Classes")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }]),
        ),
      S.listItem()
        .title("Teaching Faculty")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("teachingFaculty")
            .documentId(SINGLETON_IDS.teachingFaculty)
            .title("Teaching Faculty"),
        ),
      S.listItem()
        .title("Policies & Procedures")
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType("policies")
            .documentId(SINGLETON_IDS.policies)
            .title("Policies & Procedures"),
        ),
      S.listItem()
        .title("Questions & Answers")
        .icon(HelpCircleIcon)
        .child(
          S.document()
            .schemaType("faqs")
            .documentId(SINGLETON_IDS.faqs)
            .title("Questions & Answers"),
        ),
      S.listItem()
        .title("Impact Award")
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType("impactAward")
            .documentId(SINGLETON_IDS.impactAward)
            .title("Impact Award"),
        ),
      S.listItem()
        .title("Volunteers List")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("volunteersList")
            .documentId(SINGLETON_IDS.volunteersList)
            .title("Volunteers List"),
        ),
      S.listItem()
        .title("Event Volunteers")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("volunteerRoster")
            .documentId(SINGLETON_IDS.volunteerRoster)
            .title("Event Volunteers"),
        ),
      S.divider(),
      S.listItem()
        .title("Advanced")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Advanced")
            .items([
              S.listItem()
                .title("Site settings")
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId(SINGLETON_IDS.siteSettings)
                    .title("Site settings"),
                ),
            ]),
        ),
    ]);
