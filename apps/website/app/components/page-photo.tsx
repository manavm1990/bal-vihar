import { fetchSanityData } from "@lib/sanity/fetch";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import { SanityImage } from "./sanity-image";

interface PagePhotoProps {
  path?: string;
}

export default async function PagePhoto({ path }: PagePhotoProps) {
  if (!path) return null;

  const photos = mapPhotoGallery(await fetchSanityData(PHOTO_GALLERY_QUERY))?.photos ?? [];
  const photo = photos.find((item) => item.image?.asset && (item.pages ?? []).includes(path));

  return !photo?.image ? null : (
    <figure className="relative aspect-16/6 overflow-hidden rounded-lg border">
      <SanityImage
        value={photo.image}
        fallbackAlt={photo.title}
        fill
        width={1336}
        height={501}
        sizes="(max-width: 1400px) 100vw, 1336px"
        className="object-cover"
      />
    </figure>
  );
}
