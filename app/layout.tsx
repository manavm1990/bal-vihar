import type { Metadata } from "next";
import { Poppins, Rozha_One } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const rozhaOne = Rozha_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rozha-one",
});

export const metadata = {
  title: "Balvihar St. Louis",
  description: "Hindu Cultural Education Program in St. Louis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${rozhaOne.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
