import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";
import SchedulePicker from "./schedule-picker.client";

const PAGE = STATIC_PAGES.classSchedule;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function EducationClassSchedulePage() {
  return <StaticContentPage page={PAGE} intro={<SchedulePicker />} />;
}
