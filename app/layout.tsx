import Header from '@components/header'
import QuickLinks from '@components/quick-links'
import { BASE_TITLE, DESCRIPTION } from '@lib/constants'
import { createJsonLd } from '@lib/utils'
import type { Metadata } from 'next'
import { Eczar, Poppins } from 'next/font/google'
import './globals.css'

const TITLE = 'Center for Indian Cultural Education'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-eczar',
})

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description: DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${eczar.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createJsonLd(TITLE)),
          }}
        />

        <QuickLinks />
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
