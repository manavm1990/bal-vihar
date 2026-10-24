import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import { INDIA_OVERVIEW } from "@lib/india-overview-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";
import Image from "next/image";
import himalayas from "../../assets/indian-heritage/himalayas.jpg";
import kashmir from "../../assets/indian-heritage/kashmir.jpg";
import kerala from "../../assets/indian-heritage/kerala.jpg";
import thar from "../../assets/indian-heritage/thar-desert.jpg";
import varanasi from "../../assets/indian-heritage/varanasi.jpg";

const SECTION_LINKS = [
  { href: "#india-the-land-and-its-people", title: "Land and People" },
  { href: "#the-national-emblem", title: "National Emblem" },
  { href: "#the-national-flag", title: "National Flag" },
  { href: "#national-song-vande-mataram", title: "National Song" },
  { href: "#public-holidays-and-religious-festivals", title: "Festivals" },
] as const;

const PHOTOS = [
  { src: himalayas, title: "Himalayas", alt: "A snow-capped peak in the Himalayas" },
  { src: kashmir, title: "Kashmir", alt: "A boat on a lake in Kashmir with mountains behind" },
  {
    src: kerala,
    title: "Kerala",
    alt: "Fishing boats and coconut palms along a Kerala backwater",
  },
  {
    src: thar,
    title: "Thar Desert",
    alt: "Two camels walking along a dune in the Thar Desert at sunset",
  },
  {
    src: varanasi,
    title: "Varanasi",
    alt: "People bathing in the river at Varanasi in golden light",
  },
];

export const metadata: Metadata = createStaticPageMetadata(INDIA_OVERVIEW);

export default function EducationAboutIndiaPage() {
  return (
    <StaticContentPage
      page={INDIA_OVERVIEW}
      intro={
        <div className="space-y-4">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {PHOTOS.map(({ src, title, alt }) => (
              <li key={title} className="last:col-span-2 md:last:col-span-1">
                <figure className="space-y-1">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg border">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-muted-foreground text-center text-sm">
                    {title}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <SectionNav label="On this page" links={SECTION_LINKS} />
        </div>
      }
    />
  );
}
