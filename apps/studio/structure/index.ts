import { SINGLETON_IDS } from "@bv/schemas";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { UsersIcon } from "@sanity/icons/Users";
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
        .title("Home page")
        .icon(HomeIcon)
        .child(
          S.document().schemaType("homePage").documentId(SINGLETON_IDS.homePage).title("Home page"),
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
        .title("Policies & Procedures")
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType("policies")
            .documentId(SINGLETON_IDS.policies)
            .title("Policies & Procedures"),
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
