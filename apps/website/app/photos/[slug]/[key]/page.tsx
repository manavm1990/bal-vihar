import Article from "@components/article";
import { SanityImage } from "@components/sanity/sanity-image";
import { Button } from "@components/ui/button";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import {
  createPhotoShareUrl,
  fetchPhotoAlbum,
  getAlbumPath,
  getPhotoAlt,
  getPhotoPath,
  getPreviewImageUrl,
  PREVIEW_SIZE,
} from "@lib/sanity/photo-albums";
import { PHOTO_ALBUMS_QUERY } from "@lib/sanity/queries";
import type { SanityImageValue } from "@lib/sanity/types";
import { Share1Icon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const IMAGE_WIDTH = 1200;

interface PhotoPageProps {
  params: Promise<{ slug: string; key: string }>;
}

export default function PhotoPage({ params }: PhotoPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading photo…</MutedP>}>
      <PhotoContent params={params} />
    </Suspense>
  );
}

async function PhotoContent({ params }: PhotoPageProps) {
  const { slug, key } = await params;
  const album = await fetchPhotoAlbum(slug);
  const index = album?.photos.findIndex((item) => item._key === key) ?? -1;
  const photo = album?.photos[index];
  if (!album || !photo?.asset) notFound();

  const caption = photo.caption?.trim();
  const previous = album.photos[index - 1];
  const next = album.photos[index + 1];

  return (
    <Article
      title={album.title}
      subtitle={`Photo ${index + 1} of ${album.photos.length}`}
      className="md:columns-1"
    >
      <Link href={getAlbumPath(album.slug)} className="block w-fit">
        ← Back to {album.title}
      </Link>
      <figure className="max-w-3xl space-y-3">
        <SanityImage
          value={photo}
          fallbackAlt={getPhotoAlt(photo, album.title, index)}
          width={IMAGE_WIDTH}
          height={getImageHeight(photo)}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="h-auto w-full rounded-lg border"
          priority
        />
        {caption ? (
          <figcaption className="text-muted-foreground text-sm">{caption}</figcaption>
        ) : null}
      </figure>
      <Button asChild variant="outline" className="w-fit">
        <a href={createPhotoShareUrl(album, photo)} target="_blank" rel="noopener noreferrer">
          <Share1Icon aria-hidden="true" className="mr-2 size-4" />
          Share on WhatsApp
        </a>
      </Button>
      <nav aria-label="More photos" className="flex max-w-3xl justify-between gap-3">
        {previous ? (
          <Button asChild variant="outline">
            <Link href={getPhotoPath(album.slug, previous._key)}>← Previous photo</Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="outline">
            <Link href={getPhotoPath(album.slug, next._key)}>Next photo →</Link>
          </Button>
        ) : null}
      </nav>
    </Article>
  );
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: PHOTO_ALBUMS_QUERY });

  return data.flatMap(({ slug, photoKeys }) => photoKeys.map((key) => ({ slug, key })));
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const { slug, key } = await params;
  const album = await fetchPhotoAlbum(slug, { stega: false });
  const index = album?.photos.findIndex((item) => item._key === key) ?? -1;
  const photo = album?.photos[index];
  if (!album || !photo) return {};

  const title = `${album.title}, photo ${index + 1} | ${BASE_TITLE}`;
  const description =
    photo.caption?.trim() || `Photo ${index + 1} of ${album.photos.length} from ${album.title}.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: getPhotoPath(album.slug, photo._key),
      title,
      description,
      images: [
        {
          url: getPreviewImageUrl(photo),
          ...PREVIEW_SIZE,
          alt: getPhotoAlt(photo, album.title, index),
        },
      ],
    },
  };
}

/** Keeps the picture's own proportions, so tall photos aren't cropped on the page. */
const getImageHeight = (image: SanityImageValue) => {
  const { width, height } = image.asset?.metadata?.dimensions ?? {};

  return width && height ? Math.round((IMAGE_WIDTH * height) / width) : IMAGE_WIDTH * 0.75;
};
