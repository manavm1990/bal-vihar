import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { BuildingOfficeIcon, PhoneIcon, SchoolIcon } from '@components/ui/icons'
import { H3, P } from '@components/ui/typography'
import { BASE_TITLE } from '@lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import Form from './components/form'

const FAQS = [
  {
    question: 'What is Bal Vihar of St. Louis?',
    answer:
      'Bal Vihar organization is registered as "Center for Indian Cultural Education Bal Vihar of St. Louis". It is a not-for-profit volunteer run organization with exemption from the Federal Income tax under section 501 (c) (3). The primary focus of this organization is to instill, foster and preserve Indian cultural values among children of ages 5 through 18.',
  },
  {
    question: 'Where does Bal Vihar of St. Louis meet?',
    answer: 'The Hindu Temple of St. Louis Community Center 725 Weidman Rd, St. Louis, MO 63011.',
  },
  {
    question: 'Can anyone be admitted to Bal Vihar School?',
    answer:
      'Yes, those children who meet the admission age and program criteria are admitted without any religious association, cast, creed, color or nationality.',
  },
  {
    question: 'What are the admission criteria?',
    answer:
      'Your child must be 5 years old on a given July 31st to be admitted. Please visit "Admission Process" for details on older children.',
  },
  {
    question:
      'We just moved to St. Louis and my child was attending Bal Vihar previously. Can he / she join Bal Vihar in middle of the school year.',
    answer: 'No.',
  },
  {
    question: 'My child is 14 years old. Can he/she join Bal Vihar?',
    answer: 'Yes, he / she can join Bal Vihar.',
  },
  {
    question:
      'My child’s friend is in a different group than the group assigned to my child. Can he/she switch?',
    answer:
      'Generally no, unless they were in a large group belonging to the same grade but split because of the number of children.',
  },
  {
    question: 'Is there a Registration Fee?',
    answer:
      'Yes. Registration for students is $250 plus a $50 refundable volunteer deposit. The volunteer deposit is returned upon completion of your selected volunteer activity for the school year.',
  },
  {
    question: 'Is the registration fee refundable if my child does not attend?',
    answer:
      'Once you register, no fees are returned once the school classes begin. You can get the volunteer deposit back.',
  },
  {
    question:
      'If I am unable to afford the registration fees for Bal Vihar and my child/children wish to attend what should I do?',
    answer: 'Please refer to the policy.',
  },
  {
    question:
      'Since Bal Vihar is a not-for-profit organization, is the registration fee tax exempt?',
    answer:
      'No, Your child/children are provided with services rendered by the school and it is not tax deductible. However any donation to Bal Vihar is tax-exempt.',
  },
  {
    question: 'Why Bal Vihar charges a registration fee?',
    answer:
      'Operational expenses, school rental, supplies and events are our major expense items and we generally break even. Bal Vihar is an all volunteer organization and it has no payroll expense.',
  },
  {
    question: 'When can I register my child/children?',
    answer: 'May - July, before the school year starts.',
  },
  {
    question: 'I am traveling to India in summer? How could I enroll my child?',
    answer:
      'Online registration is open from May - July. After the deadline, which is announced well in advance, no child is admitted.',
  },
  {
    question: 'When is the school in session?',
    answer:
      'Normally from 10:00 am - 12:30 pm every other Sunday throughout the school year from August - May except for the festivals and other celebrations that the school holds. Please refer School Calendar for complete schedule for the rest of the year.',
  },
  {
    question: 'Is every parent required to volunteer?',
    answer:
      'Yes, Bal Vihar is a volunteer run organization, at least one parent must volunteer otherwise the volunteer deposit is not refunded. For parents with multiple children the volunteering is per child.',
  },
  {
    question: 'How do I volunteer?',
    answer:
      'At the time of registration, please pick the event activity from the menu. If you would like to be part of the administration team please contact one of the administrative team members.',
  },
  {
    question: 'I missed my volunteer obligation, what are my options?',
    answer:
      'If it is the end of the school year and you missed the volunteer obligation and if all volunteer activities are done, you have to forfeit the volunteer deposit. If it is in the beginning or middle of the school year then we may assign you to volunteer in any upcoming activity provided a spot is available. Please contact one of the volunteering team members.',
  },
  {
    question: 'What is Bal Vihar’s primary mode of communication?',
    answer:
      'Via the e-mail, administration or the teacher will contact you for all the announcements or activities. You can also visit the website or your child/children’s webpage for the day’s activity or class homework.',
  },
  {
    question: 'Can I send a mass e-mail to parents?',
    answer: 'No. Only authorized individuals from the administration can perform this function.',
  },
  {
    question: 'Do Bal Vihar children celebrate any festivals?',
    answer:
      'Yes, Diwali, Holi, Republic day, picnic are the main events. Please click here for photos from previous years.',
  },
  {
    question: 'Does Bal Vihar have a designated curriculum?',
    answer:
      'Yes, regular Bal Vihar curriculum includes religious, social and cultural units besides dedicated yoga and Bhajan curriculum. For details, please click here. For youth group curriculum, click here.',
  },
  {
    question:
      'Can my child represent Bal Vihar in another local organization function or celebration?',
    answer: 'Only with permission from Bal Vihar faculty or administration.',
  },
  {
    question: 'I would like to advertise my business on Bal Vihar’s website. How do I do it?',
    answer: 'Please discuss the rates with the fundraising team.',
  },
  {
    question:
      'Can a mass e-mail about a function or activity by any other organization or a business or an individual be sent to parents?',
    answer: 'No, Bal Vihar mass communication is for school related activities only.',
  },
  {
    question:
      'Are there any policies and procedure to follow in case of any grievance against a teacher or member of administration?',
    answer:
      'Yes, Bal Vihar follows a strict National code of ethics and conduct. Policies and Procedures are in place if there are any complaints. Please click here for details.',
  },
] as const

const TITLE = 'Questions & Contact Information ℹ️'

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
}

export default function QuestionsPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <section>
          <FAQ />
        </section>

        <section>
          <Contact />
        </section>
      </div>
    </main>
  )
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
              If you still have questions, please give us a call or feel free to reach out to us
              using the form. Being a volunteer organization, we may not be able to respond to every
              inquiry immediately and we appreciate your understanding. Thank you for your interest
              in Bal Vihar.
            </P>

            <dl className="text-muted-foreground mt-10 space-y-4 text-base/7">
              <address className="flex flex-col gap-x-4">
                <dt className="flex gap-x-2">
                  <H3>Administrative Address</H3>
                  <BuildingOfficeIcon
                    aria-hidden="true"
                    className="text-muted-foreground h-7 w-6"
                  />
                </dt>
                <dd>
                  1700 Countrytop Court
                  <br />
                  Wildwood, MO 63038-1446
                </dd>
              </address>

              <address className="flex flex-col gap-x-4">
                <dt className="flex gap-x-2">
                  <H3>School Address</H3>
                  <SchoolIcon aria-hidden="true" className="text-muted-foreground h-7 w-6" />
                </dt>
                <dd>
                  Hindu Temple Community Center <br />
                  725 Weidman Road
                  <br />
                  Ballwin, MO 63011
                </dd>
              </address>

              <address className="flex gap-x-2">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="text-muted-foreground h-7 w-6" />
                </dt>
                <dd>
                  <a href="tel:+1 (636) 458-9634" className="hover:text-foreground">
                    (636) 458-9634
                  </a>
                </dd>
              </address>
            </dl>
          </div>

          <div className="flex-1">
            <Form />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          The Center for Indian cultural Education - Bal Vihar of St. Louis is a volunteer-based
          organization. Please check our FAQs for answers to many common questions before{' '}
          <Link href="#contact">contacting us.</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
