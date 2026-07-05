import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES["communityOutreach"];

export const metadata: Metadata = createStaticPageMetadata(PAGE!);

export default function AboutUsCommunityOutreachPage() {
  return <StaticContentPage page={PAGE!} />;
}
