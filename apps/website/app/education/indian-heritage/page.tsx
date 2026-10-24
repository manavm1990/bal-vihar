import ImageGallery from "@components/image-gallery.client";
import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import { H2 } from "@components/ui/typography";
import { INDIAN_HERITAGE, SIGHT_IMAGES } from "@lib/indian-heritage-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";

const SECTION_LINKS = [
  { href: "#a-brief-history-of-time", title: "History" },
  { href: "#languages-of-india", title: "Languages" },
  { href: "#sanskrit", title: "Sanskrit" },
  { href: "#the-vedas", title: "Vedas" },
  { href: "#science-and-mathematics", title: "Science and Math" },
  { href: "#kalarippayat", title: "Kalarippayat" },
  { href: "#classical-dance-forms", title: "Dance" },
  { href: "#the-deities-of-india", title: "Deities and Epics" },
  { href: "#the-words-of-lord-krishna-in-the-bhagavad-gita", title: "Bhagavad Gita" },
  { href: "#sights-of-india", title: "Sights of India" },
] as const;

export const metadata: Metadata = createStaticPageMetadata(INDIAN_HERITAGE);

export default function EducationIndianHeritagePage() {
  return (
    <div className="space-y-8">
      <StaticContentPage
        page={INDIAN_HERITAGE}
        intro={<SectionNav label="On this page" links={SECTION_LINKS} />}
      />
      <section className="space-y-3">
        <H2 id="sights-of-india" variant="plain" className="text-2xl tracking-tight">
          Sights of India
        </H2>
        <ImageGallery images={SIGHT_IMAGES} label="Sights of India photo viewer" />
      </section>
    </div>
  );
}
