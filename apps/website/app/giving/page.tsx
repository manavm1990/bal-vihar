import Article from "@components/article";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Bq, Em, H2, MutedP, P, Strong } from "@components/ui/typography";
import { ADMIN_OFFICE, BASE_TITLE, FEDERAL_TAX_ID, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

const SHLOKA =
  "DEHI SAUBHAAGYAM AAROGYAM DEHIME PARAMAM SUKHAM RUPAM DEHI JAYAM DEHI YASHO DEHI DWISHOJAHI";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Giving`,
  description:
    "Support Bal Vihar of St. Louis with a tax-deductible gift by check, through an employer matching gift, or by stock.",
};

export default function GivingPage() {
  return (
    <Article title="Giving" className="md:columns-1">
      <Bq className="max-w-prose text-sm font-medium tracking-wide not-italic">{SHLOKA}</Bq>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
        <div className="space-y-4">
          <P>
            Greetings from the fund-raising team and thank you for your interest in giving to the{" "}
            {ORGANIZATION_LEGAL_NAME} - {BASE_TITLE}. It is our hope that this site will help you
            learn more about the many ways to support us and the importance of your contributions.
          </P>
          <P>
            Parents, alumni, grandparents, friends and various businesses have supported the school
            generously in the past. Our exceptional volunteer faculty and thorough curriculum that
            constitute the educational experience would not be possible without the generous support
            of your time and money. The yearly fees support part of the expenses and our future
            growth depends on your contributions to fulfill our vision and mission.
          </P>
          <P>
            <Em>
              A donation to {BASE_TITLE} is an investment in the future of our children, to improve
              our offerings and to build our infrastructure.
            </Em>{" "}
            We hope that you will consider making a gift today. Your{" "}
            <Strong>tax-deductible (IRS Employee ID# : {FEDERAL_TAX_ID})</Strong> donation will make
            a difference.
          </P>
          <P>
            Your gift helps us enhance the curriculum, buy technology such as projectors, put on
            major events and field trips, and cover the difference between tuition income and the
            actual cost to nurture each Bal Vihar student.
          </P>
        </div>
        <section className="space-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <H2>Ways to give</H2>
          <div className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>By check</CardTitle>
                <CardDescription>
                  Make checks payable to &ldquo;{ORGANIZATION_LEGAL_NAME}&rdquo; and mail them to:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <address className="leading-6 font-medium not-italic">
                  {ORGANIZATION_LEGAL_NAME}
                  <br />
                  {BASE_TITLE}
                  <br />
                  {ADMIN_OFFICE.streetAddress}
                  <br />
                  {ADMIN_OFFICE.addressLocality}, {ADMIN_OFFICE.addressRegion}{" "}
                  {ADMIN_OFFICE.postalCode}
                </address>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Matching gifts</CardTitle>
                <CardDescription>
                  Participating companies match the dollars their employees, spouses or retirees
                  give to the {ORGANIZATION_LEGAL_NAME}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/giving/matching-gifts">See how matching gifts work</Link>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Stocks</CardTitle>
                <CardDescription>
                  Send an inquiry and we will contact you with more information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/questions#contact">Contact Bal Vihar</Link>
              </CardContent>
            </Card>
          </div>
        </section>
        <div className="space-y-8">
          <section className="space-y-4">
            <H2>Community support</H2>
            <P>
              We would like to extend our sincere appreciation and thanks to all of the businesses
              and individuals that donated to the {ORGANIZATION_LEGAL_NAME} - {BASE_TITLE}{" "}
              fundraising event for the new school building on <Strong>April 24, 2010</Strong> at
              Lafayette High School, Wildwood, MO. We met our goal and collected more than $230,000.
            </P>
          </section>
          <section className="space-y-4">
            <P className="text-lg font-semibold">
              Every gift &ndash; no matter the size &ndash; makes a difference at {BASE_TITLE}.
            </P>
            <MutedP className="max-w-prose italic">
              All gifts to {BASE_TITLE} offer donors varying degrees of tax and financial benefits.
              Consult with your personal financial or legal adviser in making a gift that is the
              best choice for you.
            </MutedP>
          </section>
        </div>
      </div>
    </Article>
  );
}
