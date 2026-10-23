import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";
import SchedulePicker from "./schedule-picker.client";

const PAGE = STATIC_PAGES.classSchedule;

const SECTION_LINKS = [
  { href: "#k7-schedule", title: "Groups K–7" },
  { href: "#where-to-go", title: "Where to go" },
  { href: "#youth-group", title: "Youth Group" },
] as const;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function EducationClassSchedulePage() {
  return (
    <StaticContentPage
      page={PAGE}
      intro={
        <>
          <SectionNav label="On this page" links={SECTION_LINKS} />
          <SchedulePicker />
        </>
      }
    />
  );
}
