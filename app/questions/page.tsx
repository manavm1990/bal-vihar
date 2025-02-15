import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { BuildingOfficeIcon, PhoneIcon, SchoolIcon } from '@components/ui/icons'
import { H2, H3, LeadP, P } from '@components/ui/typography'
import { BASE_TITLE } from '@lib/constants'
import type { Metadata } from 'next'

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
    <main className="bg-background relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Contact Info + FAQ */}
        <section className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <Bg />
            <Info />
            <div className="mt-16">
              <FAQ />
            </div>
          </div>
        </section>

        {/* Right Column - Form */}
        <section>
          <Form />
        </section>
      </div>
    </main>
  )
}

function Bg() {
  return (
    <div className="bg-muted absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-gray-900/10 lg:w-1/2">
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="100%"
            y={-1}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M130 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="white" width="100%" height="100%" strokeWidth={0} />
        <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
          <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
    </div>
  )
}

function FAQ() {
  return (
    <div className="w-full">
      <H2 className="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Frequently Asked Questions
      </H2>
      <LeadP className="mt-6">
        Find answers to common questions about Bal Vihar of St. Louis, including admission criteria,
        registration fees, school sessions, and more.
      </LeadP>

      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function Form() {
  return (
    <form action="#" method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-foreground block text-sm/6 font-semibold">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="text-foreground block text-sm/6 font-semibold">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-foreground block text-sm/6 font-semibold">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="text-foreground block text-sm/6 font-semibold">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-foreground block text-sm/6 font-semibold">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="bg-background text-foreground outline-border placeholder:text-muted-foreground focus:outline-ring block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2"
                defaultValue={''}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-600 focus-visible:outline-ring rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Send message
          </button>
        </div>
      </div>
    </form>
  )
}

function Info() {
  return (
    <div>
      <H2 className="text-foreground text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
        Contact Us
      </H2>

      <LeadP>
        The Center for Indian cultural Education - Bal Vihar of St. Louis is a volunteer-based
        organization. If you have questions about our school, programs, events, registration, or
        fees; please check our FAQs below 👇🏾 for answers to many common questions before contacting
        us.
      </LeadP>

      <P>
        If you still have questions, please give us a call or feel free to reach out to us using the
        form. Being a volunteer organization, we may not be able to respond to every inquiry
        immediately and we appreciate your understanding. Thank you for your interest in Bal Vihar.
      </P>

      <dl className="text-muted-foreground mt-10 space-y-4 text-base/7">
        <address className="flex flex-col gap-x-4">
          <dt className="flex gap-x-2">
            <H3>Administrative Address</H3>
            <BuildingOfficeIcon aria-hidden="true" className="text-muted-foreground h-7 w-6" />
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
            <a href="tel:+1 (555) 234-5678" className="hover:text-foreground">
              (636) 458-9634
            </a>
          </dd>
        </address>
      </dl>
    </div>
  )
}
