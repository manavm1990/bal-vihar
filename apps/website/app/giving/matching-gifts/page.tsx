import Article from "@components/article";
import { H2, H3, LeadP, MutedP, Ol, P, Strong, Ul } from "@components/ui/typography";
import { BASE_TITLE, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { MATCHING_GIFT_COMPANIES } from "./constants";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Matching Gifts`,
  description:
    "How an employer matching gift can double or triple your donation to Bal Vihar of St. Louis, and the St. Louis companies that offer one.",
};

export default function MatchingGiftsPage() {
  return (
    <Article title="Matching Gifts" className="md:columns-1">
      <LeadP>With matching gifts you can sometimes double or even triple your gift!</LeadP>
      <P>
        One of the smartest ways to give is through a matching gift program, where a company will
        match donations to charitable organizations. These matches are often dollar for dollar,
        which doubles or sometimes triples your charitable-donation power. Many employers sponsor
        matching gift programs and will match charitable contributions made by their employees.
      </P>
      <section className="space-y-4">
        <H2>How it works</H2>
        <P>
          Check with your company&apos;s <Strong>human resources</Strong> or payroll department to
          see whether it offers a matching gift program, and ask for the donation guidelines and a
          list of eligible charities. {BASE_TITLE} is a &ldquo;<Strong>Cultural</Strong>&rdquo;
          organization.
        </P>
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-3">
            <H3>Online process</H3>
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
            <H3>Paper form process</H3>
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
        <H2>St. Louis companies with matching gift programs</H2>
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
    </Article>
  );
}
