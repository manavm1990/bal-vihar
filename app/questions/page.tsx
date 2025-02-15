import { BuildingOfficeIcon, PhoneIcon, SchoolIcon } from '@components/ui/icons'
import { H2, H3, LeadP, P } from '@components/ui/typography'
import { BASE_TITLE } from '@lib/constants'
import type { Metadata } from 'next'

const TITLE = 'Questions & Contact Information ℹ️'

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
}

export default function QuestionsPage() {
  return (
    <main className="bg-background relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <section className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
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

            <div>
              <H2 className="text-foreground text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
                Contact Us
              </H2>

              <LeadP>
                The Center for Indian cultural Education - Bal Vihar of St. Louis is a
                volunteer-based organization. If you have questions about our school, programs,
                events, registration, or fees; please check our FAQs below 👇🏾 for answers to many
                common questions before contacting us.
              </LeadP>

              <P>
                If you still have questions, please give us a call or feel free to reach out to us
                using the form. Being a volunteer organization, we may not be able to respond to
                every inquiry immediately and we appreciate your understanding. Thank you for your
                interest in Bal Vihar.
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
                    <a href="tel:+1 (555) 234-5678" className="hover:text-foreground">
                      (636) 458-9634
                    </a>
                  </dd>
                </address>
              </dl>
            </div>
          </div>
        </section>

        <section>
          <form action="#" method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="text-foreground block text-sm/6 font-semibold"
                  >
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
                  <label
                    htmlFor="last-name"
                    className="text-foreground block text-sm/6 font-semibold"
                  >
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
                  <label
                    htmlFor="phone-number"
                    className="text-foreground block text-sm/6 font-semibold"
                  >
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
                  <label
                    htmlFor="message"
                    className="text-foreground block text-sm/6 font-semibold"
                  >
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
        </section>
      </div>
    </main>
  )
}
