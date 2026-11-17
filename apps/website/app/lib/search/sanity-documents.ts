import { stegaBrand, stegaClean } from "@sanity/client/stega";
import type {
  CALENDAR_EVENTS_QUERY_RESULT,
  CLASS_PAGES_QUERY_RESULT,
  FAQS_QUERY_RESULT,
  PAGES_SEARCH_QUERY_RESULT,
  PHOTO_ALBUMS_QUERY_RESULT,
  POLICIES_QUERY_RESULT,
} from "sanity.types";
import { type FaqItemView, getFaqs } from "../sanity/faqs";
import {
  type CalendarEvent,
  formatCalendarEventMeta,
  mapCalendarEvents,
} from "../sanity/map-calendar-events";
import { getCurrentPages } from "../sanity/pages";
import { getPolicies, type PolicySectionView } from "../sanity/policies";
import { extractText } from "../sanity/portable-text";
import type { SearchDocument } from "./search";

type SearchAlbum = PHOTO_ALBUMS_QUERY_RESULT[number];
type SearchClassPage = CLASS_PAGES_QUERY_RESULT[number];
type SearchPage = PAGES_SEARCH_QUERY_RESULT[number];

interface SanitySearchSource {
  albums: readonly SearchAlbum[] | null | undefined;
  events: readonly CALENDAR_EVENTS_QUERY_RESULT[number][] | null | undefined;
  faqs: FAQS_QUERY_RESULT | null | undefined;
  now?: Date;
  pages: PAGES_SEARCH_QUERY_RESULT | null | undefined;
  classes: readonly SearchClassPage[] | null | undefined;
  policies: POLICIES_QUERY_RESULT | null | undefined;
}

const clean = (value: string | null | undefined) => stegaClean(value ?? "");

const describeAlbum = ({
  schoolYear,
  photoCount,
}: {
  schoolYear: string | null;
  photoCount: number | null;
}) =>
  [
    schoolYear ? `School year ${schoolYear}` : null,
    `${photoCount ?? 0} ${photoCount === 1 ? "photo" : "photos"}`,
  ]
    .filter(Boolean)
    .join(" · ");

const createAlbumDocument = (album: SearchAlbum): SearchDocument => ({
  id: `album:${album._id}`,
  title: clean(album.title),
  section: "Events & Community › Photos",
  href: `/photos/${clean(album.slug)}`,
  text: clean(describeAlbum(album)),
});

const createEventDocument = (event: CalendarEvent): SearchDocument => ({
  id: `event:${event._id}`,
  title: clean(event.title),
  section: "Events & Community › Calendar",
  href: `/calendar/${event._id}`,
  text: clean([formatCalendarEventMeta(event), event.description].filter(Boolean).join(". ")),
});

const createFaqDocument = ({ key, question, answer }: FaqItemView): SearchDocument => ({
  id: `faq:${key}`,
  title: clean(question),
  section: "Contact › FAQs",
  href: "/questions#faqs",
  text: clean(extractText(answer)),
});

const createPageDocument = (page: SearchPage): SearchDocument => ({
  id: `editor-page:${page._id}`,
  title: clean(page.title),
  section: "Events & Community › Pages",
  href: `/${clean(page.slug)}`,
  text: clean([page.description, extractText(page.body)].filter(Boolean).join(" ")),
});

function createPolicyDocuments(section: PolicySectionView): SearchDocument[] {
  const href = `/about-us/policies-procedures#${clean(section.slug)}`;
  const sectionTitle = clean(section.title);

  return [
    {
      id: `policy:${section.key}`,
      title: sectionTitle,
      section: "About Us › Policies & Procedures",
      href,
      text: clean(extractText(section.intro)),
    },
    ...section.items.map((item) => ({
      id: `policy:${section.key}:${item.key}`,
      title: clean(item.title),
      section: `Policies & Procedures › ${sectionTitle}`,
      href,
      text: clean(extractText(item.body)),
    })),
  ];
}

export function createSanitySearchDocuments({
  albums,
  events,
  faqs,
  classes,
  now = new Date(),
  pages,
  policies,
}: SanitySearchSource): SearchDocument[] {
  return [
    ...mapCalendarEvents(stegaBrand(events)).map(createEventDocument),
    ...(classes ?? []).flatMap(({ _id, title, slug, teachers }) =>
      title && slug
        ? [
            {
              id: `class:${_id}`,
              title: `${clean(title)} class webpage`,
              section: "Education › Class webpages",
              href: `/education/classes/${clean(slug)}`,
              text: teachers ? `Taught by ${clean(teachers)}` : "",
            },
          ]
        : [],
    ),
    ...getCurrentPages(pages, now).map(createPageDocument),
    ...getFaqs(faqs).map(createFaqDocument),
    ...(albums ?? []).map(createAlbumDocument),
    ...getPolicies(policies ?? null).sections.flatMap(createPolicyDocuments),
  ];
}
