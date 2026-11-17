import { PolicySectionBody } from "@components/policy-section";
import StaticContentPage from "@components/static-content-page";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { getPolicySection } from "@lib/sanity/policies";
import { POLICIES_QUERY } from "@lib/sanity/queries";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.education;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default async function EducationPage() {
  const result = await fetchSanityOrNull(POLICIES_QUERY, "the education policies");
  const policies = getPolicySection(result?.data ?? null, "education");

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
