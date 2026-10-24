import Article from "@components/article";
import { SanityImage } from "@components/sanity/sanity-image";
import { Button } from "@components/ui/button";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { urlFor } from "@lib/sanity/image";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import { createPhotoShareUrl, describePhoto, fetchPhoto } from "@lib/sanity/photos";
import { PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { SanityImageValue } from "@lib/sanity/types";
import { Share1Icon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const IMAGE_WIDTH = 1200;
const MAX_DESCRIPTION_LENGTH = 200;
// 1.91:1 is the shape link previews are cropped to.
const PREVIEW_SIZE = { width: 1200, height: 630 };

interface PhotoPageProps {
  params: Promise<{ key: string }>;
}

export default function PhotoPage({ params }: PhotoPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading photo…</MutedP>}>
      <PhotoContent params={params} />
    </Suspense>
  );
}

async function PhotoContent({ params }: PhotoPageProps) {
  const photo = await fetchPhoto((await params).key);
  if (!photo?.image) notFound();

  const caption = describePhoto(photo);

  return (
    <Article title={photo.title} className="md:columns-1">
      <Link href="/photos" className="block w-fit">
        ← All photos
      </Link>
      <figure className="max-w-3xl space-y-3">
        <SanityImage
          value={photo.image}
          fallbackAlt={photo.title}
          width={IMAGE_WIDTH}
          height={getImageHeight(photo.image)}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="h-auto w-full rounded-lg border"
          priority
        />
        {caption ? (
          <figcaption className="text-muted-foreground text-sm">{caption}</figcaption>
        ) : null}
      </figure>
      <Button asChild variant="outline" className="w-fit">
        <a href={createPhotoShareUrl(photo)} target="_blank" rel="noopener noreferrer">
          <Share1Icon aria-hidden="true" className="mr-2 size-4" />
          Share on WhatsApp
        </a>
      </Button>
    </Article>
  );
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: PHOTO_GALLERY_QUERY });

  return (data?.photos ?? []).flatMap((photo) => (photo.image?.asset ? [{ key: photo._key }] : []));
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const photo = await fetchPhoto((await params).key, { stega: false });
  if (!photo?.image) return {};

  const title = `${photo.title} | ${BASE_TITLE}`;
  const description =
    describePhoto(photo).slice(0, MAX_DESCRIPTION_LENGTH) || `A photo from ${BASE_TITLE}.`;
  // JPEG, cropped to the preview shape and kept small, which chat apps load most reliably.
  const imageUrl = urlFor(photo.image)
    .width(PREVIEW_SIZE.width)
    .height(PREVIEW_SIZE.height)
    .fit("crop")
    .format("jpg")
    .quality(75)
    .url();

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: `/photos/${photo.key}`,
      title,
      description,
      images: [{ url: imageUrl, ...PREVIEW_SIZE, alt: photo.image.alt?.trim() || photo.title }],
    },
  };
}

/** Keeps the picture's own proportions, so tall photos aren't cropped on the page. */
const getImageHeight = (image: SanityImageValue) => {
  const { width, height } = image.asset?.metadata?.dimensions ?? {};

  return width && height ? Math.round((IMAGE_WIDTH * height) / width) : IMAGE_WIDTH * 0.75;
};
