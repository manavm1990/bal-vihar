import SectionNav from "@components/section-nav";
import StaticContentPage from "@components/static-content-page";
import { H2, H3, Ul } from "@components/ui/typography";
import { FESTIVAL_PHOTOS, INDIA_OVERVIEW, PHOTO_CREDITS } from "@lib/india-overview-content";
import { createStaticPageMetadata } from "@lib/static-page-content";
import type { Metadata } from "next";
import Image from "next/image";

const SECTION_LINKS = [
  { href: "#india-the-land-and-its-people", title: "Land and People" },
  { href: "#the-national-emblem", title: "National Emblem" },
  { href: "#the-national-flag", title: "National Flag" },
  { href: "#national-song-vande-mataram", title: "National Song" },
  { href: "#public-holidays-and-religious-festivals", title: "Festivals" },
] as const;

export const metadata: Metadata = createStaticPageMetadata(INDIA_OVERVIEW);

export default function EducationAboutIndiaPage() {
  return (
    <div className="space-y-8">
      <StaticContentPage
        page={INDIA_OVERVIEW}
        intro={<SectionNav label="On this page" links={SECTION_LINKS} />}
      />
      <FestivalPhotos />
      <PhotoCredits />
    </div>
  );
}

function FestivalPhotos() {
  return (
    <section className="space-y-4">
      <H2 variant="plain" className="text-2xl tracking-tight">
        Festivals in Pictures
      </H2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {FESTIVAL_PHOTOS.map(({ title, alt, src }) => (
          <li key={title}>
            <figure className="space-y-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-muted-foreground text-center text-sm">{title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PhotoCredits() {
  return (
    <section className="space-y-2">
      <H3 className="text-lg">Photo Credits</H3>
      <Ul variant="unstyled" className="text-muted-foreground space-y-1 text-sm">
        {PHOTO_CREDITS.map(({ work, author, license, licenseUrl, sourceUrl }) => (
          <li key={sourceUrl}>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {work}
            </a>{" "}
            by {author},{" "}
            <a href={licenseUrl} target="_blank" rel="noopener noreferrer">
              {license}
            </a>
            , via Wikimedia Commons
          </li>
        ))}
      </Ul>
      <p className="text-muted-foreground text-sm">The flag illustration is original.</p>
    </section>
  );
}
