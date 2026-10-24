import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { BuildingOfficeIcon, PhoneIcon, SchoolIcon } from "@components/ui/icons";
import { H3, P } from "@components/ui/typography";
import { ADMIN_OFFICE, BASE_TITLE, SCHOOL_LOCATION } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./components/form/contact-form.client";

const SCHOOL_ADDRESS = `${SCHOOL_LOCATION.streetAddress}, ${SCHOOL_LOCATION.addressLocality}, ${SCHOOL_LOCATION.addressRegion} ${SCHOOL_LOCATION.postalCode}`;
const SCHOOL_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SCHOOL_LOCATION.name}, ${SCHOOL_ADDRESS}`)}`;

const FAQS = [
  {
    question: "What is Bal Vihar of St. Louis?",
    answer:
      'Bal Vihar is registered as "Center for Indian Cultural Education Bal Vihar of St. Louis". It is a not-for-profit, volunteer-run organization exempt from federal income tax under section 501(c)(3). The primary focus is to instill, foster, and preserve Indian cultural values among children ages 5 through 18.',
  },
  {
    question: "Where does Bal Vihar of St. Louis meet?",
    answer: (
      <>
        {SCHOOL_LOCATION.name},{" "}
        <a
          href={SCHOOL_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-ink underline"
        >
          {SCHOOL_ADDRESS}
        </a>
        .
      </>
    ),
  },
  {
    question: "Can anyone be admitted to Bal Vihar School?",
    answer:
      "Yes. Children who meet the admission age and program criteria are admitted without regard to religious association, caste, creed, color, or nationality.",
  },
  {
    question: "What are the admission criteria?",
    answer:
      "Your child must be 5 years old on a given July 31st to be admitted. Please see the Admissions Policies under Policies & Procedures for details on older children.",
  },
  {
    question:
      "We just moved to St. Louis and my child was attending Bal Vihar previously. Can he / she join Bal Vihar in middle of the school year.",
    answer: "No.",
  },
  {
    question: "My child is 14 years old. Can he/she join Bal Vihar?",
    answer: "Yes, he / she can join Bal Vihar.",
  },
  {
    question:
      "My child’s friend is in a different group than the group assigned to my child. Can he/she switch?",
    answer:
      "Generally no, unless they were in a large group of the same grade that was split because of class size.",
  },
  {
    question: "Is there a Registration Fee?",
    answer:
      "Yes. Registration for students is $250 plus a $50 refundable volunteer deposit. The volunteer deposit is returned upon completion of your selected volunteer activity for the school year.",
  },
  {
    question: "Is the registration fee refundable if my child does not attend?",
    answer:
      "Once you register, no fees are returned once the school classes begin. You can get the volunteer deposit back.",
  },
  {
    question:
      "If I am unable to afford the registration fees for Bal Vihar and my child/children wish to attend what should I do?",
    answer: "Please refer to the policy.",
  },
  {
    question:
      "Since Bal Vihar is a not-for-profit organization, is the registration fee tax exempt?",
    answer:
      "No. Registration pays for school services and is not tax deductible. Donations to Bal Vihar are tax-exempt.",
  },
  {
    question: "Why Bal Vihar charges a registration fee?",
    answer:
      "Operational expenses, school rental, supplies and events are our major expense items and we generally break even. Bal Vihar is an all volunteer organization and it has no payroll expense.",
  },
  {
    question: "When can I register my child/children?",
    answer: "May through July, before the school year starts.",
  },
  {
    question: "I am traveling to India in summer? How could I enroll my child?",
    answer:
      "Online registration is open from May through July. After the announced deadline, no child is admitted.",
  },
  {
    question: "When is the school in session?",
    answer:
      "From 10:00 am - 12:30 pm on select Sundays from August - May, usually every other week. There are breaks, and sometimes classes fall on two Sundays in a row. Please refer to the School Calendar for the complete schedule.",
  },
  {
    question: "Is every parent required to volunteer?",
    answer:
      "Yes. Bal Vihar is volunteer-run. At least one parent must volunteer, or the volunteer deposit is not refunded. For families with multiple children, volunteering is per child.",
  },
  {
    question: "How do I volunteer?",
    answer:
      "At the time of registration, please pick the event activity from the menu. If you would like to be part of the administration team please contact one of the administrative team members.",
  },
  {
    question: "I missed my volunteer obligation, what are my options?",
    answer:
      "If it is the end of the school year and you missed the volunteer obligation and if all volunteer activities are done, you have to forfeit the volunteer deposit. If it is in the beginning or middle of the school year then we may assign you to volunteer in any upcoming activity provided a spot is available. Please contact one of the volunteering team members.",
  },
  {
    question: "What is Bal Vihar’s primary mode of communication?",
    answer:
      "Via the e-mail, administration or the teacher will contact you for all the announcements or activities. You can also visit the website or your child/children’s webpage for the day’s activity or class homework.",
  },
  {
    question: "Can I send a mass e-mail to parents?",
    answer: "No. Only authorized individuals from the administration can send mass email.",
  },
  {
    question: "Do Bal Vihar children celebrate any festivals?",
    answer:
      "Yes, Diwali, Holi, Republic day, picnic are the main events. Please click here for photos from previous years.",
  },
  {
    question: "Does Bal Vihar have a designated curriculum?",
    answer:
      "Yes, regular Bal Vihar curriculum includes religious, social and cultural units besides dedicated yoga and Bhajan curriculum. For details, please click here. For youth group curriculum, click here.",
  },
  {
    question:
      "Can my child represent Bal Vihar in another local organization function or celebration?",
    answer: "Only with permission from Bal Vihar faculty or administration.",
  },
  {
    question: "I would like to advertise my business on Bal Vihar’s website. How do I do it?",
    answer: "Please discuss the rates with the fundraising team.",
  },
  {
    question:
      "Can a mass e-mail about a function or activity by any other organization or a business or an individual be sent to parents?",
    answer: "No. Bal Vihar mass communication is for school-related activities only.",
  },
  {
    question:
      "Are there any policies and procedure to follow in case of any grievance against a teacher or member of administration?",
    answer:
      "Yes, Bal Vihar follows a strict National code of ethics and conduct. Policies and Procedures are in place if there are any complaints. Please click here for details.",
  },
] as const;

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

function Faq() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          The Center for Indian Cultural Education – Bal Vihar of St. Louis is a volunteer-based
          organization. Please check our FAQs for answers to many common questions before{" "}
          <Link href="#contact">contacting us</Link>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
