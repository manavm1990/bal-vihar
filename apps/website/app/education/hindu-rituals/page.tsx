import StaticContentPage from "@components/static-content-page";
import { HINDU_RITUALS } from "@lib/hindu-rituals-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = createStaticPageMetadata(HINDU_RITUALS);

export default function EducationHinduRitualsPage() {
  return <StaticContentPage page={HINDU_RITUALS} photoPath="/education/hindu-rituals" />;
}
