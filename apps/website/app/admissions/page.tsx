import { PolicySectionBody } from "@components/policy-section";
import StaticContentPage from "@components/static-content-page";
import { fetchPolicySection } from "@lib/sanity/policies";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.admissions;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default async function AdmissionsPage() {
  const policies = await fetchPolicySection("admissions");

  return (
    <StaticContentPage page={PAGE} photoPath="/admissions">
      {policies && (
        <div className="[&_h5]:mt-2 [&_ul]:my-2">
          <PolicySectionBody {...policies} />
        </div>
      )}
    </StaticContentPage>
  );
}
