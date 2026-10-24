import ImageGallery from "@components/image-gallery.client";
import StaticContentPage from "@components/static-content-page";
import { createStaticPageMetadata } from "@lib/static-page-content";
import { TEMPLE_IMAGES, TEMPLES_OF_INDIA } from "@lib/temples-of-india-content";
import type { Metadata } from "next";

export const metadata: Metadata = createStaticPageMetadata(TEMPLES_OF_INDIA);

export default function EducationTemplesOfIndiaPage() {
  return (
    <StaticContentPage page={TEMPLES_OF_INDIA}>
      <ImageGallery images={TEMPLE_IMAGES} label="Temples of India photo viewer" />
    </StaticContentPage>
  );
}
