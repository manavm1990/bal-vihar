import Article from "@components/article";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Bq, Em, H2, H3, H4, LeadP, MutedP, Ol, P, Strong, Ul } from "@components/ui/typography";
import { ADMIN_OFFICE, BASE_TITLE, FEDERAL_TAX_ID, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { MATCHING_GIFT_COMPANIES } from "./constants";

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
                <a href="#matching-gifts">See how matching gifts work</a>
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
      <MatchingGifts />
    </Article>
  );
}

function MatchingGifts() {
  return (
    <section
      id="matching-gifts"
      aria-labelledby="matching-gifts-heading"
      className="scroll-mt-6 space-y-6"
    >
      <div className="space-y-4">
        <H2 id="matching-gifts-heading">Matching gifts</H2>
        <LeadP>With matching gifts you can sometimes double or even triple your gift!</LeadP>
        <P>
          One of the smartest ways to give is through a matching gift program, where a company will
          match donations to charitable organizations. These matches are often dollar for dollar,
          which doubles or sometimes triples your charitable-donation power. Many employers sponsor
          matching gift programs and will match charitable contributions made by their employees.
        </P>
      </div>
      <section className="space-y-4">
        <H3>How it works</H3>
        <P>
          Check with your company&apos;s <Strong>human resources</Strong> or payroll department to
          see whether it offers a matching gift program, and ask for the donation guidelines and a
          list of eligible charities. {BASE_TITLE} is a &ldquo;<Strong>Cultural</Strong>&rdquo;
          organization.
        </P>
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-3">
            <H4>Online process</H4>
            <P>
              These days most of the companies are using an online form to submit matching gifts.
            </P>
            <Ol>
              <li>
                Go to your company&apos;s <Strong>matching gift website / portal</Strong>. Your
                Human Resource (<Strong>HR</Strong>) personnel should be able to locate this website
                for you.
              </li>
              <li>
                Log in using your User ID (SSN#) and password. Select &ldquo;
                <Strong>{ORGANIZATION_LEGAL_NAME}</Strong>&rdquo; or &ldquo;
                <Strong>{BASE_TITLE}</Strong>&rdquo; as the recipient organization and enter the
                amount, type and date of your gift.
              </li>
              <li>You will be able to print a confirmation of your gift registration.</li>
              <li>We will be notified and we will confirm receipt of the gift.</li>
              <li>
                Once confirmed by us and approved by your company&apos;s matching gift
                administrator, the gift will be recorded as eligible for the match.
              </li>
              <li>
                The matching gift check will be sent directly to {BASE_TITLE}. Payments are usually
                made on a quarterly basis.
              </li>
            </Ol>
          </section>
          <section className="space-y-3">
            <H4>Paper form process</H4>
            <Ol>
              <li>Print a matching gift program form from your company.</li>
              <li>Decide how much you want to donate.</li>
              <li>
                Make a <Strong>check</Strong> payable to &ldquo;
                <Strong>{ORGANIZATION_LEGAL_NAME}</Strong>&rdquo; and submit it to our treasurer or
                any admin staff member, with the &ldquo;Employee Section&rdquo; of the form
                completely filled in.
              </li>
              <li>
                Once received, we will complete the rest of the form to ensure that the match is
                donated and received by {BASE_TITLE}, and mail it to your matching gift
                administrator.
              </li>
              <li>It usually takes 3 to 4 months to receive the payment from your company.</li>
            </Ol>
          </section>
        </div>
        <P>
          If you have any question regarding the matching gift program, please contact{" "}
          <Link href="/questions#contact">the fundraising team</Link>.
        </P>
      </section>
      <section className="space-y-4">
        <H3>St. Louis companies with matching gift programs</H3>
        <P>
          Your employer may match charitable contributions made by their employees. It is a great
          way to increase the size of your donation and voice your support of {BASE_TITLE}. Please
          contact the Human Resources Department at your place of employment for the appropriate
          form(s) and confirmation of a matching gifts program.
        </P>
        <MutedP>
          We attempt to update this list annually, but please be aware companies may discontinue
          matching gift programs in the meantime.
        </MutedP>
        <Ul variant="unstyled" className="columns-2 gap-x-8 pt-2 md:columns-3 lg:columns-4">
          {MATCHING_GIFT_COMPANIES.map((company) => (
            <li key={company} className="break-inside-avoid py-1">
              {company}
            </li>
          ))}
        </Ul>
      </section>
    </section>
  );
}
