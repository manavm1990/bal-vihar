import Article from "@components/article";
import { SanityImage } from "@components/sanity/sanity-image";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchPhotoAlbums, type PhotoAlbumSummary } from "@lib/sanity/photo-albums";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Photos`,
  description: "Community photos from Bal Vihar events, celebrations, and service projects.",
};

export default async function PhotosPage() {
  const albums = await fetchPhotoAlbums();

  return (
    <Article title="Photos" className="md:columns-1">
      {albums.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No photos have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <P>
            Highlights from Bal Vihar events and service projects. Pick a gallery to see all of its
            photos.
          </P>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album._id}>
                <AlbumCard album={album} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Article>
  );
}

interface AlbumCardProps {
  album: PhotoAlbumSummary;
}

function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link
      href={album.path}
      className="group focus-visible:ring-ring block space-y-1.5 focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="relative block aspect-4/3 overflow-hidden rounded-lg border">
        {album.cover ? (
          // The title below names the link, so the picture itself has no description.
          <SanityImage
            value={{ ...album.cover, alt: null }}
            fill
            width={800}
            height={600}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
      </span>
      <span className="block text-lg font-semibold">{album.title}</span>
      <span className="text-muted-foreground block text-sm">{album.description}</span>
    </Link>
  );
}
