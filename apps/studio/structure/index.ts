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
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { UPLOADS } from "../templates";

const PAGE_END = "coalesce(showUntil, event->date)";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Edit the website")
    .items([
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
        .title("Calendar")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("calendarEvent")
            .title("Calendar")
            .defaultOrdering([{ field: "date", direction: "asc" }])
            .menuItems([
              ...(S.documentTypeList("calendarEvent").getMenuItems() ?? []),
              S.menuItem()
                .title("Upload from spreadsheet")
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
        .title("Custom pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Custom pages")
            .items([
              createPagesItem({
                S,
                title: "Current",
                filter: `!defined(${PAGE_END}) || ${PAGE_END} >= $today`,
              }),
              createPagesItem({ S, title: "Archived", filter: `${PAGE_END} < $today` }),
            ]),
        ),
      S.listItem()
        .title("Event volunteers")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Event volunteers")
            .items([
              S.listItem()
                .title("Edit individual entries")
                .icon(UsersIcon)
                .child(
                  S.document()
                    .schemaType("volunteerRoster")
                    .documentId(SINGLETON_IDS.volunteerRoster)
                    .title("Event volunteers"),
                ),
              S.listItem()
                .title("Upload from spreadsheet")
                .icon(UploadIcon)
                .child(
                  S.document()
                    .schemaType("spreadsheetImport")
                    .documentId(UPLOADS.volunteerRoster.id)
                    .initialValueTemplate(UPLOADS.volunteerRoster.template)
                    .title("Upload event volunteers from spreadsheet"),
                ),
            ]),
        ),
      S.listItem()
        .title("Header notice")
        .icon(WarningOutlineIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId(SINGLETON_IDS.homePage)
            .title("Header notice"),
        ),
      S.listItem()
        .title("Home page strip & page banners")
        .icon(ImageIcon)
        .child(
          S.document()
            .schemaType("photoGallery")
            .documentId(SINGLETON_IDS.photoGallery)
            .title("Home page strip & page banners"),
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
        .title("Teaching Faculty")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("teachingFaculty")
            .documentId(SINGLETON_IDS.teachingFaculty)
            .title("Teaching Faculty"),
        ),
    ]);

const createPagesItem = ({
  S,
  title,
  filter,
}: {
  S: StructureBuilder;
  title: string;
  filter: string;
}) =>
  S.listItem()
    .title(title)
    .icon(DocumentIcon)
    .child(
      S.documentList()
        .title(`${title} custom pages`)
        .schemaType("page")
        .filter(`_type == "page" && (${filter})`)
        .params({ today: getToday() })
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
    );

const getToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
