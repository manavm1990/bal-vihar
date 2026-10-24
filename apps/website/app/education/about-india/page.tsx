import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import { INDIA_OVERVIEW } from "@lib/india-overview-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";

const SECTION_LINKS = [
  { href: "#india-the-land-and-its-people", title: "Land and People" },
  { href: "#the-national-emblem", title: "National Emblem" },
  { href: "#the-national-flag", title: "National Flag" },
  { href: "#national-song-vande-mataram", title: "National Song" },
  { href: "#public-holidays-and-religious-festivals", title: "Festivals" },
] as const;

export const metadata: Metadata = createStaticPageMetadata(INDIA_OVERVIEW);

export default function EducationAboutIndiaPage() {
  return (
    <StaticContentPage
      page={INDIA_OVERVIEW}
      intro={<SectionNav label="On this page" links={SECTION_LINKS} />}
    />
  );
}
