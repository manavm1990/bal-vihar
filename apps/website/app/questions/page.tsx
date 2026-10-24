import { PolicyText } from "@components/policy-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { BuildingOfficeIcon, PhoneIcon, SchoolIcon } from "@components/ui/icons";
import { H3, MutedP, P } from "@components/ui/typography";
import { ADMIN_OFFICE, BASE_TITLE, SCHOOL_LOCATION } from "@lib/constants";
import { fetchFaqs } from "@lib/sanity/faqs";
import { extractText } from "@lib/sanity/portable-text";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import Link from "next/link";
import type { FAQPage, WithContext } from "schema-dts";
import ContactForm from "./components/form/contact-form.client";

const TITLE = "Questions & Contact";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Frequently asked questions about Bal Vihar of St. Louis, plus contact information and a message form.",
};

export default function QuestionsPage() {
  return (
    <div className="space-y-8">
      <Faq />
      <Contact />
    </div>
  );
}

function Contact() {
  return (
    <Card>
      <CardHeader>
        <CardTitle id="contact">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <P>
              If you still have questions, please give us a call or reach out using the form. Being
              a volunteer organization, we may not respond to every inquiry immediately, and we
              appreciate your understanding. Thank you for your interest in Bal Vihar.
            </P>

            <dl className="text-muted-foreground mt-10 space-y-4 text-base/7">
              <address className="flex flex-col gap-x-4 not-italic">
                <dt className="flex gap-x-2">
                  <H3>Administrative Address</H3>
                  <BuildingOfficeIcon
                    aria-hidden="true"
                    className="text-muted-foreground h-7 w-6"
                  />
                </dt>
                <dd>
                  {ADMIN_OFFICE.streetAddress}
                  <br />
                  {ADMIN_OFFICE.addressLocality}, {ADMIN_OFFICE.addressRegion}{" "}
                  {ADMIN_OFFICE.postalCode}
                </dd>
              </address>

              <address className="flex flex-col gap-x-4 not-italic">
                <dt className="flex gap-x-2">
                  <H3>School Address</H3>
                  <SchoolIcon aria-hidden="true" className="text-muted-foreground h-7 w-6" />
                </dt>
                <dd>
                  {SCHOOL_LOCATION.name}
                  <br />
                  {SCHOOL_LOCATION.streetAddress}
                  <br />
                  {SCHOOL_LOCATION.addressLocality}, {SCHOOL_LOCATION.addressRegion}{" "}
                  {SCHOOL_LOCATION.postalCode}
                </dd>
              </address>

              <address className="flex gap-x-2 not-italic">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="text-muted-foreground h-7 w-6" />
                </dt>
                <dd>
                  <a href={`tel:${ADMIN_OFFICE.phoneHref}`} className="hover:text-foreground">
                    {ADMIN_OFFICE.phoneDisplay}
                  </a>
                </dd>
              </address>
            </dl>
          </div>

          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function Faq() {
  const faqs = await fetchFaqs();
  // The same questions and answers the page shows, for search and answer engines to read.
  const structuredData: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: stegaClean(faq.question),
      acceptedAnswer: { "@type": "Answer", text: stegaClean(extractText(faq.answer)) },
    })),
  };

  return (
    <Card id="faqs">
      {faqs.length > 0 ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData).replaceAll("<", "\\u003c")}
        </script>
      ) : null}
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          The Center for Indian Cultural Education – Bal Vihar of St. Louis is a volunteer-based
          organization. Please check our FAQs for answers to many common questions before{" "}
          <Link href="#contact">contacting us</Link>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {faqs.length === 0 ? (
          <MutedP>Questions and answers are being updated. Please check back soon.</MutedP>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.key} value={faq.key}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <PolicyText value={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
