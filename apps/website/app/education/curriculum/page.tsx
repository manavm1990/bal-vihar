import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import {
  createStaticPageMetadata,
  STATIC_PAGES,
  type StaticPageContent,
} from "@lib/static-page-content";
import type { Metadata } from "next";

const SECTION_LINKS = [
  { href: "#groups-k-7", title: "Groups K–7" },
  { href: "#youth-group", title: "Youth Group" },
] as const;

/** Moves each heading one level down so a page's sections nest under the one above it. */
const demoteHeadings = (content: string) => content.replace(/^(#{2,4})(\s)/gm, "#$1$2");

const PAGE: StaticPageContent = {
  title: "Curriculum",
  description:
    "Objectives, methodology and assessment for Groups K–7, and the Youth Group (Y1–Y5) program.",
  content: [
    "## Groups K–7",
    demoteHeadings(STATIC_PAGES.curriculumK7.content),
    "## Youth Group",
    "*Levels Y1–Y5*",
    demoteHeadings(STATIC_PAGES.curriculumYouthGroup.content),
  ].join("\n\n"),
};

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function EducationCurriculumPage() {
  return (
    <StaticContentPage
      page={PAGE}
      // The key photos were saved under when Curriculum K–7 was its own page.
      photoPath="/education/curriculum-k-7"
      intro={<SectionNav label="On this page" links={SECTION_LINKS} />}
    />
  );
}
