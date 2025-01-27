import { Poppins, Rozha_One } from 'next/font/google'
import './globals.css'

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
  title: 'Center for Indian Cultural Education – Bal Vihar of St. Louis',
  description:
    'Balvihar, St. Louis, Saint Louis, India, Indian culture, ethnicity, children, Center for Indian Cultural Education, Annual Gala Event, Bal Vihar of St. Louis, Asian India, Bal Vihar, St. Louis Kids, St. Louis Community Projects, Holi, Diwali, Republic Day',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${rozhaOne.variable} font-sans`}>{children}</body>
    </html>
  )
}
