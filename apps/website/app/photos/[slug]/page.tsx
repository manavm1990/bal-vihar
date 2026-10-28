import Article from "@components/article";
import ImageGallery from "@components/ui/image-gallery";
import { MutedP } from "@components/ui/typography";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import { createAlbumMetadata, fetchPhotoAlbum } from "@lib/sanity/photo-albums";
import { PHOTO_ALBUMS_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface GalleryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  return createAlbumMetadata(await fetchPhotoAlbum((await params).slug, { stega: false }));
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: PHOTO_ALBUMS_QUERY });

  return data.map(({ slug }) => ({ slug }));
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

  const images = album.photos.map((photo) => ({
    alt: photo.alt,
    caption: photo.caption?.trim() || undefined,
    id: photo._key,
    image: photo,
    shareHref: photo.shareHref,
  }));

  return (
    <Article title={album.title} subtitle={album.description} className="md:columns-1">
      <Link href="/photos" className="block w-fit">
        ← All galleries
      </Link>
      <ImageGallery images={images} label={`${album.title} photos`} />
    </Article>
  );
}
