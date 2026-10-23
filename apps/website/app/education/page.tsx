import { PolicySectionBody } from "@components/policy-section";
import StaticContentPage from "@components/static-content-page";
import { fetchPolicySection } from "@lib/sanity/policies";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.education;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default async function EducationPage() {
  const policies = await fetchPolicySection("education");

  return (
    <StaticContentPage page={PAGE} photoPath="/education">
      {policies && (
        <div className="[&_h5]:mt-2 [&_ul]:my-2">
          <PolicySectionBody {...policies} />
        </div>
      )}
    </StaticContentPage>
  );
}
