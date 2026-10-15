import { SINGLETON_IDS, SINGLETON_TYPES } from "@bv/schemas";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPE_SET = new Set<string>(SINGLETON_TYPES);

/**
 * Editor desk prioritizes what actually changes:
 * home announcements/hero, photo gallery, calendar.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.document().schemaType("homePage").documentId(SINGLETON_IDS.homePage).title("Home Page"),
        ),
      S.listItem()
        .title("Photo Gallery")
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType("photoGallery")
            .documentId(SINGLETON_IDS.photoGallery)
            .title("Photo Gallery"),
        ),
      S.listItem()
        .title("Calendar Events")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("calendarEvent")
            .title("Calendar Events")
            .defaultOrdering([{ field: "date", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SINGLETON_IDS.siteSettings)
            .title("Site Settings"),
        ),
      // Hide duplicate singleton entries from the auto list; keep other docs available.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !SINGLETON_TYPE_SET.has(id) && id !== "calendarEvent" : true;
      }),
    ]);
