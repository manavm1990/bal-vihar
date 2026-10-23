import Article from "@components/article";
import { PhotoGrid } from "@components/photos/photo-grid";
import { Card, CardContent } from "@components/ui/card";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Photos`,
  description: "Community photos from Bal Vihar events, celebrations, and service projects.",
};

export default async function PhotosPage() {
  const payload = await fetchSanityData(PHOTO_GALLERY_QUERY);
  const gallery = mapPhotoGallery(payload, { featuredOnly: false });
  const photos = gallery?.photos ?? [];

  return (
    <Article title="Photos" className="md:columns-1">
      {photos.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No photos have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <PhotoGrid
          items={photos}
          title="Photo gallery"
          description="Highlights from Bal Vihar events and service projects."
        />
      )}
    </Article>
  );
}
