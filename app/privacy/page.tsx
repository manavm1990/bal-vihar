import { H2, P, Small } from '@components/ui/typography'

export default function PrivacyPage() {
  return (
    <>
      <H2>Privacy Statement</H2>
      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:gap-x-12 [&>p]:!mt-0 [&>p]:text-balance">
        <P>
          You don't want your personal information to fall into the wrong hands. Neither does Center
          for Indian Cultural Education – Bal Vihar of St. Louis. When you visit the Center for
          Indian Cultural Education – Bal Vihar of St. Louis web site, we may collect and store
          information about your visit on an anonymous, aggregate basis. This information may
          include the time and length of your visit, the pages you look at on our site, and the site
          you visited just before coming to ours. We may also record the name of your Internet
          service provider. We use this information only to measure site activity and to develop
          ideas for improving our site.
        </P>

        <P>
          There are also several opportunities on our web site for you to provide us with
          information about you and your interests, such as your name, mailing address and e-mail
          address. If you choose to share any personal information with us, we may store it and use
          it for marketing research and other marketing purposes, which may include sharing it
          <sup>*</sup> with other companies in the Center for Indian Cultural Education – Bal Vihar
          of St. Louis family and our business partners. We will never sell your information to any
          other company.
        </P>

        <P>
          Some of our web site may make use of "cookie 🍪" technology to measure site activity and
          to customize information to your personal tastes. A cookie 🍪 is an element of data that a
          Web site can send to your browser, which may then store the cookie 🍪 on your hard drive.
          So, when you come back to visit us again, we can tailor information to suit your
          individual preferences. The goal is to save you time and provide you with a more
          meaningful visit.
        </P>

        <P>
          You take online privacy seriously, and so does Center for Indian Cultural Education – Bal
          Vihar of St. Louis. It's our way of sustaining your trust in Center for Indian Cultural
          Education – Bal Vihar of St. Louis and our services.
        </P>

        <P>
          Center for Indian Cultural Education – Bal Vihar of St. Louis reserves the right to alter
          our privacy principles as business needs require. Any alterations to these principles will
          be posted on our web site in a timely manner.
        </P>
      </div>

      <footer className="mt-3">
        <Small className="max-w-prose">
          <sup>*</sup>Unless you have told Center for Indian Cultural Education – Bal Vihar of St.
          Louis not to share certain information according to our privacy notice titled “Important
          Information About Your Privacy”.
        </Small>
      </footer>
    </>
  )
}
