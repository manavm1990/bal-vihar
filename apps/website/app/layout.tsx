import { DisableDraftMode } from "@components/disable-draft-mode.client";
import Footer from "@components/footer";
import Header from "@components/header";
import { BASE_TITLE, DESCRIPTION, ORGANIZATION_LEGAL_NAME, SITE_URL } from "@lib/constants";
import { SanityLive } from "@lib/sanity/live";
import { createJsonLd } from "@lib/utils";
import type { Metadata } from "next";
import { Eczar, Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

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
  metadataBase: new URL(SITE_URL),
  title: FULL_TITLE,
  description: DESCRIPTION,
  applicationName: BASE_TITLE,
  // Resolves to each page's own address. Without it no page names its canonical URL.
  alternates: { canonical: "./" },
  // Only what is the same on every page. A title, description or address here would be copied
  // onto every page's share preview, so pages fall back to their own title and description.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BASE_TITLE,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} ${eczar.variable} font-sans`}>
        <script type="application/ld+json">{JSON.stringify(createJsonLd(TITLE))}</script>

        <a
          href="#main-content"
          className="bg-background text-foreground focus-visible:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="container pt-8 pb-4 md:pt-12">
          {children}
        </main>
        <Footer />
        <SanityLive includeDrafts={isDraftMode} />
        {isDraftMode ? (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        ) : null}
      </body>
    </html>
  );
}
