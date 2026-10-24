import { PolicySectionBody } from "@components/policy-section";
import StaticContentPage from "@components/static-content-page";
import { Button } from "@components/ui/button";
import { REGISTRATION_URL } from "@lib/constants";
import { fetchPolicySection } from "@lib/sanity/policies";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";
import Link from "next/link";

const PAGE = STATIC_PAGES.admissions;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default async function AdmissionsPage() {
  const policies = await fetchPolicySection("admissions");

  return (
    <StaticContentPage
      page={PAGE}
      photoPath="/admissions"
      intro={
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={REGISTRATION_URL}>Register a student</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/new-families">New families</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/disclaimer">Disclaimer form</Link>
          </Button>
        </div>
      }
    >
      {policies ? (
        <div className="[&_h5]:mt-2 [&_ul]:my-2">
          <PolicySectionBody {...policies} />
        </div>
      ) : null}
    </StaticContentPage>
  );
}
