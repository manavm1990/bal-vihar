import { getToday, SINGLETON_IDS } from "@bv/schemas";
import { API_VERSION } from "@bv/schemas/constants";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { ClockIcon } from "@sanity/icons/Clock";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EditIcon } from "@sanity/icons/Edit";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { UploadIcon } from "@sanity/icons/Upload";
import { UsersIcon } from "@sanity/icons/Users";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { getPublishedId } from "sanity";
import type {
  ListItemBuilder,
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";
import { getAccess, type SectionId, UNPUBLISHED_FILTER } from "../roles";
import { UPLOADS } from "../templates";

interface SectionContext {
  classes: readonly string[] | null;
  getClient: StructureResolverContext["getClient"];
}

interface Section {
  create: (S: StructureBuilder, context: SectionContext) => ListItemBuilder;
  group: (typeof GROUPS)[number];
  id: SectionId;
}

const GROUPS = ["After each class", "Now and then", "Once a year"] as const;
const PAGE_END = "coalesce(showUntil, event->date)";
const SECTIONS = [
  {
    id: "classes",
    group: "After each class",
    create: (S, { classes, getClient }) => createClassesItem({ S, classes, getClient }),
  },
  {
    id: "banners",
    group: "Now and then",
    create: (S) =>
      createSingletonItem({ S, title: "Banner photos", type: "photoGallery", icon: ImageIcon }),
  },
  {
    id: "calendar",
    group: "Now and then",
    create: (S) =>
      S.listItem()
        .title("Calendar")
        .icon(CalendarIcon)
        .child(
          S.list()
            .title("Calendar")
            .items([
              createDatedItem({
                S,
                title: "Upcoming events",
                type: "calendarEvent",
                filter: "date >= $today",
                direction: "asc",
                orderBy: "date",
              }),
              createDatedItem({
                S,
                title: "Past events",
                type: "calendarEvent",
                filter: "date < $today",
                direction: "desc",
                orderBy: "date",
              }),
              S.divider(),
              createUploadItem({
                S,
                title: "Add events from a spreadsheet",
                upload: UPLOADS.calendar,
              }),
            ]),
        ),
  },
  {
    id: "pages",
    group: "Now and then",
    create: (S) =>
      S.listItem()
        .title("Custom pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Custom pages")
            .items([
              createDatedItem({
                S,
                title: "Current",
                type: "page",
                filter: `!defined(${PAGE_END}) || ${PAGE_END} >= $today`,
              }),
              createDatedItem({
                S,
                title: "Archived",
                type: "page",
                filter: `${PAGE_END} < $today`,
              }),
            ]),
        ),
  },
  {
    id: "notice",
    group: "Now and then",
    create: (S) =>
      createSingletonItem({
        S,
        title: "Header notice",
        type: "homePage",
        icon: WarningOutlineIcon,
      }),
  },
  {
    id: "photos",
    group: "Now and then",
    create: (S) =>
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
  },
  {
    id: "adminTeam",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({
        S,
        title: "Administrative Team",
        type: "volunteersList",
        icon: UsersIcon,
      }),
  },
  {
    id: "eventVolunteers",
    group: "Once a year",
    create: (S) =>
      S.listItem()
        .title("Event volunteers")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Event volunteers")
            .items([
              createSingletonItem({
                S,
                title: "Edit the list",
                type: "volunteerRoster",
                icon: EditIcon,
              }),
              createUploadItem({
                S,
                title: "Replace the whole list from a spreadsheet",
                upload: UPLOADS.volunteerRoster,
              }),
            ]),
        ),
  },
  {
    id: "impactAward",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({ S, title: "Impact Award", type: "impactAward", icon: StarIcon }),
  },
  {
    id: "policies",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({
        S,
        title: "Policies & Procedures",
        type: "policies",
        icon: DocumentTextIcon,
      }),
  },
  {
    id: "presidentsMessage",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({
        S,
        title: "President's Message",
        type: "presidentsMessage",
        icon: EnvelopeIcon,
      }),
  },
  {
    id: "faqs",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({ S, title: "Questions & Answers", type: "faqs", icon: HelpCircleIcon }),
  },
  {
    id: "faculty",
    group: "Once a year",
    create: (S) =>
      createSingletonItem({
        S,
        title: "Teaching Faculty",
        type: "teachingFaculty",
        icon: UsersIcon,
      }),
  },
] as const satisfies readonly Section[];

export const structure: StructureResolver = (S, { currentUser, getClient }) => {
  const { canSee, classes, types } = getAccess(currentUser);
  const visible = SECTIONS.filter(({ id }) => canSee(id));

  return S.list()
    .title("Edit the website")
    .items([
      S.listItem()
        .id("unpublished")
        .title("Not published yet")
        .icon(ClockIcon)
        .child(
          S.documentList()
            .title("Edits waiting for Publish")
            .filter(UNPUBLISHED_FILTER)
            .params({ types })
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      ...GROUPS.flatMap((group) => {
        const items = visible.filter((section) => section.group === group);

        return !items.length
          ? []
          : ([
              S.divider().title(group),
              ...items.map((section) => section.create(S, { classes, getClient }).id(section.id)),
            ] as const);
      }),
    ]);
};

function createClassesItem({ S, classes, getClient }: SectionContext & { S: StructureBuilder }) {
  const list = S.documentList()
    .title("Classes")
    .schemaType("classPage")
    .filter(classes ? '_type == "classPage" && slug.current in $classes' : '_type == "classPage"')
    .params({ classes: classes ?? [] })
    .defaultOrdering([{ field: "sortOrder", direction: "asc" }]);
  const onlyClass = classes?.length === 1 ? classes[0] : undefined;

  return S.listItem()
    .title(onlyClass ? "My class" : "Classes")
    .icon(BookIcon)
    .child(
      !onlyClass
        ? list
        : async () => {
            const id = await getClient({ apiVersion: API_VERSION }).fetch<string | null>(
              `*[_type == "classPage" && slug.current == $slug][0]._id`,
              { slug: onlyClass },
            );

            return id ? S.document().schemaType("classPage").documentId(getPublishedId(id)) : list;
          },
    );
}

const createDatedItem = ({
  S,
  title,
  type,
  filter,
  orderBy = "_createdAt",
  direction = "desc",
}: {
  S: StructureBuilder;
  title: string;
  type: string;
  filter: string;
  orderBy?: string;
  direction?: "asc" | "desc";
}) =>
  S.listItem()
    .title(title)
    .icon(type === "calendarEvent" ? CalendarIcon : DocumentIcon)
    .child(
      S.documentTypeList(type)
        .title(title)
        .filter(`_type == $type && (${filter})`)
        .params({ today: getToday(), type })
        .defaultOrdering([{ field: orderBy, direction }]),
    );

const createSingletonItem = ({
  S,
  title,
  type,
  icon,
}: {
  S: StructureBuilder;
  title: string;
  type: keyof typeof SINGLETON_IDS;
  icon: typeof UsersIcon;
}) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(SINGLETON_IDS[type]).title(title));

const createUploadItem = ({
  S,
  title,
  upload,
}: {
  S: StructureBuilder;
  title: string;
  upload: (typeof UPLOADS)[keyof typeof UPLOADS];
}) =>
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
