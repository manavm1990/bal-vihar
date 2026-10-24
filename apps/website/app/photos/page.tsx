import Article from "@components/article";
import ImageGallery, { type GalleryImage } from "@components/image-gallery.client";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { createPhotoShareUrl } from "@lib/sanity/photos";
import { PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import type { HomePhotoBoardItem } from "@lib/sanity/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Photos`,
  description: "Community photos from Bal Vihar events, celebrations, and service projects.",
};

export default async function PhotosPage() {
  const payload = await fetchSanityData(PHOTO_GALLERY_QUERY);
  const gallery = mapPhotoGallery(payload, { featuredOnly: false });
  const photos = (gallery?.photos ?? []).filter((photo) => photo.image?.asset);
  const images = photos.map(toGalleryImage);

  return (
    <Article title="Photos" className="md:columns-1">
      {images.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No photos have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <P>
            Highlights from Bal Vihar events and service projects. Select a photo to see it larger.
          </P>
          <ImageGallery images={images} label="Community photo viewer" />
        </div>
      )}
    </Article>
  );
}

const toGalleryImage = (photo: HomePhotoBoardItem): GalleryImage => ({
  key: photo.key,
  alt: photo.image?.alt?.trim() || photo.title,
  caption: [photo.title, photo.schoolYear ? `School year ${photo.schoolYear}` : null]
    .filter(Boolean)
    .join(" · "),
  image: photo.image ?? undefined,
  shareHref: createPhotoShareUrl(photo),
});
