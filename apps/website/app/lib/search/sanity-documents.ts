import { stegaClean } from "@sanity/client/stega";
import type { POLICIES_QUERY_RESULT } from "sanity.types";
import { type FaqItemView, getFaqs } from "../sanity/faqs";
import { fetchSanityOrNull } from "../sanity/fetch";
import { formatCalendarEventMeta, mapCalendarEvents } from "../sanity/map-calendar-events";
import { describeAlbum } from "../sanity/photo-albums";
import { getPolicies, type PolicySectionView } from "../sanity/policies";
import { extractText } from "../sanity/portable-text";
import {
  CALENDAR_EVENTS_QUERY,
  CLASS_PAGES_QUERY,
  FAQS_QUERY,
  PHOTO_ALBUMS_QUERY,
  POLICIES_QUERY,
} from "../sanity/queries";
import type { CalendarEventData } from "../sanity/types";
import type { SearchDocument } from "./search";

/** Only the fields search reads from a photo gallery. */
interface SearchAlbum {
  _id: string;
  title: string;
  slug: string;
  schoolYear: string | null;
  photoCount: number;
}

/** Only the fields search reads, so cached (stega-typed) and plain query results both fit. */
interface SearchClassPage {
  _id: string;
  title: string | null;
  slug: string | null;
  teachers: string | null;
}

interface SanitySearchSource {
  albums: readonly SearchAlbum[] | null | undefined;
  events: unknown;
  faqs: Parameters<typeof getFaqs>[0];
  classes: readonly SearchClassPage[] | null | undefined;
  policies: POLICIES_QUERY_RESULT | null | undefined;
}

const POLICIES_PATH = "/about-us/policies-procedures";

/** Published events, class webpages and policies, the content editors change in Studio. */
export async function getSanitySearchDocuments(): Promise<SearchDocument[]> {
  const [events, classes, faqs, albums, policies] = await Promise.all([
    fetchSanityOrNull(CALENDAR_EVENTS_QUERY, "the calendar for search"),
    fetchSanityOrNull(CLASS_PAGES_QUERY, "the class webpages for search"),
    fetchSanityOrNull(FAQS_QUERY, "the FAQs for search"),
    fetchSanityOrNull(PHOTO_ALBUMS_QUERY, "the photo galleries for search"),
    fetchSanityOrNull(POLICIES_QUERY, "the policies for search"),
  ]);

  return createSanitySearchDocuments({
    albums: albums?.data,
    events: events?.data,
    faqs: faqs?.data,
    classes: classes?.data,
    policies: policies?.data,
  });
}

/** Pure mapping, so the page and the Algolia reindex build identical documents. */
export function createSanitySearchDocuments({
  albums,
  events,
  faqs,
  classes,
  policies,
}: SanitySearchSource): SearchDocument[] {
  return [
    ...mapCalendarEvents(events).map(createEventDocument),
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
    ...getFaqs(faqs).map(createFaqDocument),
    ...(albums ?? []).map(createAlbumDocument),
    ...getPolicies(policies ?? null).sections.flatMap(createPolicyDocuments),
  ];
}

const clean = (value: string | null | undefined) => stegaClean(value ?? "");

const createAlbumDocument = (album: SearchAlbum): SearchDocument => ({
  id: `album:${album._id}`,
  title: clean(album.title),
  section: "Events & Community › Photos",
  href: `/photos/${clean(album.slug)}`,
  text: clean(describeAlbum(album)),
});

const createEventDocument = (event: CalendarEventData): SearchDocument => ({
  id: `event:${event.id}`,
  title: clean(event.title),
  section: "Events & Community › Calendar",
  href: `/calendar/${event.id}`,
  text: clean([formatCalendarEventMeta(event), event.description].filter(Boolean).join(". ")),
});

const createFaqDocument = ({ key, question, answer }: FaqItemView): SearchDocument => ({
  id: `faq:${key}`,
  title: clean(question),
  section: "Contact › FAQs",
  href: "/questions#faqs",
  text: clean(extractText(answer)),
});

function createPolicyDocuments(section: PolicySectionView): SearchDocument[] {
  const href = `${POLICIES_PATH}#${clean(section.slug)}`;
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
