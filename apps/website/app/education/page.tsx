import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.education;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function EducationPage() {
  return <StaticContentPage page={PAGE} />;
}
