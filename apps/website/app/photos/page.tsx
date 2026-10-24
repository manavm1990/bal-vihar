import Article from "@components/article";
import ImageGallery, { type GalleryPhoto } from "@components/image-gallery.client";
import { Card, CardContent } from "@components/ui/card";
import { MutedP, P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { createPhotoShareUrl, describePhoto, fetchPhotos } from "@lib/sanity/photos";
import type { HomePhotoBoardItem } from "@lib/sanity/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Photos`,
  description: "Community photos from Bal Vihar events, celebrations, and service projects.",
};

export default async function PhotosPage() {
  const photos = (await fetchPhotos()).flatMap(toGalleryPhoto);

  return (
    <Article title="Photos" className="md:columns-1">
      {photos.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No photos have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <P>
            Highlights from Bal Vihar events and service projects. Select a photo to see it larger
            and share it.
          </P>
          <ImageGallery images={photos} label="Community photo viewer" />
        </div>
      )}
    </Article>
  );
}

const toGalleryPhoto = (photo: HomePhotoBoardItem): GalleryPhoto[] =>
  photo.image
    ? [
        {
          alt: photo.image.alt?.trim() || photo.title,
          caption: [photo.title, describePhoto(photo)].filter(Boolean).join(" · "),
          image: photo.image,
          shareHref: createPhotoShareUrl(photo),
        },
      ]
    : [];
