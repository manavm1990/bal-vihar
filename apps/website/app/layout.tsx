import Footer from "@components/footer";
import Header from "@components/header";
import QuickLinks from "@components/quick-links";
import { BASE_TITLE, DESCRIPTION, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import { createJsonLd } from "@lib/utils";
import type { Metadata } from "next";
import { Eczar, Poppins } from "next/font/google";

import "./globals.css";

const TITLE = ORGANIZATION_LEGAL_NAME;
const FULL_TITLE = `${BASE_TITLE} | ${TITLE}`;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const eczar = Eczar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eczar",
});

export const metadata: Metadata = {
  title: FULL_TITLE,
  description: DESCRIPTION,
  applicationName: BASE_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${eczar.variable} font-sans`}>
        <script type="application/ld+json">{JSON.stringify(createJsonLd(TITLE))}</script>

        <QuickLinks />
        <Header />
        <main className="container py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
