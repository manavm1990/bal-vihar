import Article from "@components/article";
import ImageGallery, { type GalleryPhoto } from "@components/image-gallery.client";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import {
  createPhotoShareUrl,
  describeAlbum,
  fetchPhotoAlbum,
  getAlbumPath,
  getPhotoAlt,
  getPreviewImageUrl,
  PREVIEW_SIZE,
} from "@lib/sanity/photo-albums";
import { PHOTO_ALBUMS_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface GalleryPageProps {
  params: Promise<{ slug: string }>;
}

export default function GalleryPage({ params }: GalleryPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading gallery…</MutedP>}>
      <GalleryContent params={params} />
    </Suspense>
  );
}

async function GalleryContent({ params }: GalleryPageProps) {
  const { slug } = await params;
  const album = await fetchPhotoAlbum(slug);
  if (!album) notFound();

  const images = album.photos.flatMap((photo, index): GalleryPhoto[] =>
    photo.asset
      ? [
          {
            alt: getPhotoAlt(photo, album.title, index),
            caption: photo.caption?.trim() || undefined,
            image: photo,
            shareHref: createPhotoShareUrl(album, photo),
          },
        ]
      : [],
  );

  return (
    <Article
      title={album.title}
      subtitle={describeAlbum({ schoolYear: album.schoolYear, photoCount: images.length })}
      className="md:columns-1"
    >
      <Link href="/photos" className="block w-fit">
        ← All galleries
      </Link>
      <ImageGallery images={images} label={`${album.title} photos`} />
    </Article>
  );
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: PHOTO_ALBUMS_QUERY });

  return data.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const album = await fetchPhotoAlbum((await params).slug, { stega: false });
  const cover = album?.photos[0];
  if (!album || !cover) return {};

  const title = `${album.title} | ${BASE_TITLE}`;
  const description = `Photos from ${album.title} at ${BASE_TITLE}${
    album.schoolYear ? ` (school year ${album.schoolYear})` : ""
  }.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: getAlbumPath(album.slug),
      title,
      description,
      images: [
        {
          url: getPreviewImageUrl(cover),
          ...PREVIEW_SIZE,
          alt: getPhotoAlt(cover, album.title, 0),
        },
      ],
    },
  };
}
