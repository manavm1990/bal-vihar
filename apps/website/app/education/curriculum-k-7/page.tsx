import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES["curriculumK7"];

export const metadata: Metadata = createStaticPageMetadata(PAGE!);

export default function EducationCurriculumK7Page() {
  return <StaticContentPage page={PAGE!} />;
}
