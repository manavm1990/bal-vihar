import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.matchingGiftCompanies;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function GivingMatchingGiftCompaniesPage() {
  return <StaticContentPage page={PAGE} />;
}
