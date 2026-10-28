import StaticContentPage from "@components/static-content-page";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";
import VolunteerApplicationForm from "./components/form/client";

const PAGE = STATIC_PAGES.volunteering;

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function VolunteeringPage() {
  return (
    <>
      <StaticContentPage page={PAGE} photoPath="/volunteering" intro={<ApplyCallout />} />
      <div id="apply" className="scroll-mt-6 pb-8">
        <VolunteerApplicationForm />
      </div>
    </>
  );
}

function ApplyCallout() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-foreground font-medium">
          Ready to help? Parents and youth are always welcome.
        </p>
        <Button asChild>
          <a href="#apply">Apply to volunteer</a>
        </Button>
      </CardContent>
    </Card>
  );
}
