import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

import VolunteerApplicationForm from "./components/form/volunteer-application-form.client";

const PAGE = STATIC_PAGES.volunteerApplication;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function VolunteeringVolunteerApplicationPage() {
  return (
    <StaticContentPage page={PAGE}>
      <VolunteerApplicationForm />
    </StaticContentPage>
  );
}
