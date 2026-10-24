import kebabCase from "lodash.kebabcase";

import { ADMIN_DOCUMENTS, ADMIN_FORMS } from "../admin-resources-content";
import { HINDU_RITUALS, RITUALS } from "../hindu-rituals-content";
import { INDIA_OVERVIEW } from "../india-overview-content";
import { INDIAN_HERITAGE, SIGHT_IMAGES } from "../indian-heritage-content";
import { STATIC_PAGES, type StaticPageContent } from "../static-page-content";
import { TEMPLE_IMAGES, TEMPLES_OF_INDIA } from "../temples-of-india-content";
import type { SearchDocument } from "./search";

interface ContentPage {
  page: StaticPageContent;
  href: string;
  section: string;
  /** False when headings repeat across the page, so `#heading` links would be ambiguous. */
  hasAnchors?: boolean;
  extraText?: string;
}

/** Pages whose text lives in JSX, so only a summary and keywords are searchable. */
interface PageEntry {
  href: string;
  title: string;
  section: string;
  text: string;
}

const PAGE_BOOST = 5;

const stripMarkdown = (value: string) =>
  value
    .replaceAll(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replaceAll(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replaceAll(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, "")
    .replaceAll(/^>\s?/gm, "")
    .replaceAll(/^\s*[-=|:\s]{3,}$/gm, " ")
    .replaceAll(/[*_`|]/g, "")
    .replaceAll(/\s+/g, " ")
    .trim();

const getCaptions = (images: readonly { caption?: string }[]) =>
  images.flatMap(({ caption }) => (caption ? [caption] : [])).join(". ");

const createEntryDocument = ({ href, title, section, text }: PageEntry): SearchDocument => ({
  id: `page:${href}`,
  title,
  section,
  href,
  text,
  boost: PAGE_BOOST,
});

const createRitualDocument = (
  { question, answer }: (typeof RITUALS)[number],
  index: number,
): SearchDocument => ({
  id: `ritual:${index}`,
  title: question,
  section: `Education › ${HINDU_RITUALS.title}`,
  href: "/education/hindu-rituals",
  text: stripMarkdown(answer),
});

const createResourceDocument = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}): SearchDocument => ({
  id: `resource:${href}`,
  title,
  section: "About Us › Forms & documents",
  href,
  text: description,
});

const CONTENT_PAGES: readonly ContentPage[] = [
  { page: STATIC_PAGES.about, href: "/about-us", section: "About Us" },
  { page: STATIC_PAGES.admissions, href: "/admissions", section: "Admissions" },
  { page: STATIC_PAGES.classSchedule, href: "/education/class-schedule", section: "Education" },
  {
    page: STATIC_PAGES.communityOutreach,
    href: "/about-us/community-outreach",
    section: "Events & Community",
  },
  {
    page: STATIC_PAGES.curriculumK7,
    href: "/education/curriculum#groups-k-7",
    section: "Education",
    hasAnchors: false,
  },
  {
    page: STATIC_PAGES.curriculumYouthGroup,
    href: "/education/curriculum#youth-group",
    section: "Education",
    hasAnchors: false,
  },
  { page: STATIC_PAGES.education, href: "/education", section: "Education" },
  { page: HINDU_RITUALS, href: "/education/hindu-rituals", section: "Education" },
  { page: INDIA_OVERVIEW, href: "/education/about-india", section: "Education" },
  {
    page: INDIAN_HERITAGE,
    href: "/education/indian-heritage",
    section: "Education",
    extraText: getCaptions(SIGHT_IMAGES),
  },
  {
    page: TEMPLES_OF_INDIA,
    href: "/education/temples-of-india",
    section: "Education",
    extraText: getCaptions(TEMPLE_IMAGES),
  },
  { page: STATIC_PAGES.volunteering, href: "/volunteering", section: "Get Involved" },
];

const PAGE_ENTRIES: readonly PageEntry[] = [
  {
    href: "/about-us/administrative-team",
    title: "Administrative Team",
    section: "About Us",
    text: "Meet the volunteer teams that run Bal Vihar and what each team does.",
  },
  {
    href: "/about-us/history",
    title: "History",
    section: "About Us",
    text: "Bal Vihar History.",
  },
  {
    href: "/about-us/policies-procedures",
    title: "Policies & Procedures",
    section: "About Us",
    text: "Bal Vihar Policies and Procedures.",
  },
  {
    href: "/admin-resources",
    title: "Forms & documents",
    section: "About Us",
    text: "Forms for teachers and staff, and the incorporation, tax-exempt status and financial review documents of Bal Vihar of St. Louis.",
  },
  {
    href: "/admin-resources/print-request",
    title: "Print request",
    section: "About Us › Forms & documents",
    text: "Request a print job from Bal Vihar of St. Louis.",
  },
  {
    href: "/calendar",
    title: "Calendar",
    section: "Events & Community",
    text: "Bal Vihar class dates, celebrations, and special events.",
  },
  {
    href: "/disclaimer",
    title: "Disclaimer form",
    section: "Admissions",
    text: "Parent consent and liability disclaimer for Bal Vihar of St. Louis school activities.",
  },
  {
    href: "/education/class-webpages",
    title: "Class webpages",
    section: "Education",
    text: "Find your child's class to see what was covered, homework and helpful links for every Bal Vihar class.",
  },
  {
    href: "/education/teaching-faculty",
    title: "Teaching faculty",
    section: "Education",
    text: "Who teaches each Bal Vihar group: class, bhajan and yoga teachers, youth assistants and program coordinators.",
  },
  {
    href: "/expense-reimbursement",
    title: "Submit an expense",
    section: "Contact",
    text: "Submit an expense for reimbursement from Bal Vihar of St. Louis.",
  },
  {
    href: "/giving",
    title: "Giving",
    section: "Get Involved",
    text: "Support Bal Vihar of St. Louis with a tax-deductible gift by check, through an employer matching gift, or by stock. Ways to give, donate, donation, community support, matching gifts.",
  },
  {
    href: "/grievance",
    title: "File a grievance",
    section: "Contact",
    text: "File a grievance with the Bal Vihar of St. Louis Grievance Committee.",
  },
  {
    href: "/new-families",
    title: "New families",
    section: "Education",
    text: "Everything new Bal Vihar families need: what a Sunday looks like, drop-off and pick-up, what to bring, and who to ask. Doors open, assembly, classroom instruction, yoga and bhajan, dismissal, clothing, folders and updates.",
  },
  {
    href: "/photos",
    title: "Photos",
    section: "Events & Community",
    text: "Community photos from Bal Vihar events, celebrations, and service projects.",
  },
  {
    href: "/presidents-message",
    title: "President's message",
    section: "About Us",
    text: "A message from the president of Bal Vihar of St. Louis.",
  },
  {
    href: "/privacy",
    title: "Privacy policy",
    section: "About Us",
    text: "Privacy policy for the Bal Vihar of St. Louis website.",
  },
  {
    href: "/questions",
    title: "Contact & FAQs",
    section: "Contact",
    text: "Frequently asked questions about Bal Vihar of St. Louis, plus contact information and a message form. Phone, address, email, send a message.",
  },
  {
    href: "/terms",
    title: "Terms of use",
    section: "About Us",
    text: "Terms of use for the Bal Vihar of St. Louis website.",
  },
  {
    href: "/volunteering/impact-award",
    title: "B-VISION Impact Award",
    section: "Get Involved",
    text: "Bal Vihar's award for youth volunteer hours: who can apply, how hours are counted, the Bronze, Silver and Gold levels, and how to apply. Tracking sheet and templates.",
  },
  {
    href: "/volunteering/volunteers",
    title: "Our volunteers",
    section: "Get Involved",
    text: "Thank you to the volunteers who helped run Bal Vihar's events, classes and administration, listed by event and A to Z.",
  },
];

export const STATIC_SEARCH_DOCUMENTS: readonly SearchDocument[] = [
  ...CONTENT_PAGES.flatMap(createContentDocuments),
  ...PAGE_ENTRIES.map(createEntryDocument),
  ...RITUALS.map(createRitualDocument),
  ...[...ADMIN_DOCUMENTS, ...ADMIN_FORMS].map(createResourceDocument),
];

/** One document for the page's opening text, then one per heading so a result can link to it. */
function createContentDocuments({
  page,
  href,
  section,
  hasAnchors = true,
  extraText = "",
}: ContentPage): SearchDocument[] {
  return splitSections(page.content).flatMap(({ heading, lines }, index) => {
    const body = stripMarkdown(lines.join("\n"));

    if (heading === null)
      return [
        {
          id: `content:${href}:intro`,
          title: page.title,
          section,
          href,
          text: [page.description, body, extraText].filter(Boolean).join(" "),
          boost: PAGE_BOOST,
        },
      ];

    return body === ""
      ? []
      : [
          {
            id: `content:${href}:${index}`,
            title: heading,
            section: `${section} › ${page.title}`,
            href: hasAnchors ? `${href}#${kebabCase(heading)}` : href,
            text: body,
          },
        ];
  });
}

function splitSections(content: string) {
  const sections: { heading: string | null; lines: string[] }[] = [{ heading: null, lines: [] }];

  for (const line of content.split("\n")) {
    const heading = line.match(/^#{2,5}\s+(.+)$/);

    if (heading?.[1]) sections.push({ heading: stripMarkdown(heading[1]), lines: [] });
    else sections.at(-1)?.lines.push(line);
  }

  return sections;
}
