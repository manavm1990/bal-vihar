import { SINGLETON_IDS } from "@bv/schemas";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { UploadIcon } from "@sanity/icons/Upload";
import { UsersIcon } from "@sanity/icons/Users";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { UPLOADS } from "../templates";

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
        .title("Photo galleries")
        .icon(ImagesIcon)
        .child(
          S.documentTypeList("photoAlbum")
            .title("Photo galleries")
            .defaultOrdering([
              { field: "schoolYear", direction: "desc" },
              { field: "_createdAt", direction: "desc" },
            ]),
        ),
      S.listItem()
        .title("Calendar")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("calendarEvent")
            .title("Calendar")
            .defaultOrdering([{ field: "date", direction: "asc" }])
            .menuItems([
              ...(S.documentTypeList("calendarEvent").getMenuItems() ?? []),
              S.menuItem()
                .title("Upload from Excel")
                .icon(UploadIcon)
                .intent({
                  type: "edit",
                  params: { id: UPLOADS.calendar.id, type: "spreadsheetImport" },
                })
                .showAsAction(true),
            ]),
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
        .title("Administrative Team")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("volunteersList")
            .documentId(SINGLETON_IDS.volunteersList)
            .title("Administrative Team"),
        ),
      S.listItem()
        .title("Event volunteers")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("volunteerRoster")
            .documentId(SINGLETON_IDS.volunteerRoster)
            .title("Event volunteers"),
        ),
      S.divider(),
      createUploadItem(S, "Upload calendar from Excel", UPLOADS.calendar),
      createUploadItem(S, "Upload event volunteers from Excel", UPLOADS.volunteerRoster),
      S.listItem()
        .title("Advanced")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Advanced")
            .items([
              S.listItem()
                .title("Home & page photos")
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType("photoGallery")
                    .documentId(SINGLETON_IDS.photoGallery)
                    .title("Home & page photos"),
                ),
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

const createUploadItem = (
  S: StructureBuilder,
  title: string,
  upload: (typeof UPLOADS)[keyof typeof UPLOADS],
) =>
  S.listItem()
    .title(title)
    .icon(UploadIcon)
    .child(
      S.document()
        .schemaType("spreadsheetImport")
        .documentId(upload.id)
        .initialValueTemplate(upload.template)
        .title(title),
    );
