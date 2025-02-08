import Header from '@components/header'
import QuickLinks from '@components/quick-links'
import { BASE_TITLE, DESCRIPTION } from '@lib/constants'
import { createJsonLd } from '@lib/utils'
import { Poppins, Rozha_One } from 'next/font/google'
import './globals.css'

const TITLE = 'Center for Indian Cultural Education'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const rozhaOne = Rozha_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rozha-one',
})

export const metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description: DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${rozhaOne.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createJsonLd(TITLE)),
          }}
        />

        <QuickLinks />
        <Header />
        {children}
      </body>
    </html>
  )
}
