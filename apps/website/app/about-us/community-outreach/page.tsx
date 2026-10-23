import { PhotoGrid } from "@components/photos/photo-grid";
import StaticContentPage from "@components/static-content-page";
import { fetchSanityData } from "@lib/sanity/fetch";
import { mapPhotoGallery } from "@lib/sanity/map-photo-gallery";
import { PHOTO_GALLERY_QUERY } from "@lib/sanity/queries";
import { createStaticPageMetadata, STATIC_PAGES } from "@lib/static-page-content";
import type { Metadata } from "next";

const PAGE = STATIC_PAGES.communityOutreach;
const PAGE_PATH = "/about-us/community-outreach";

export const metadata: Metadata = createStaticPageMetadata(PAGE);

export default function AboutUsCommunityOutreachPage() {
  return (
    <StaticContentPage page={PAGE} photoPath={PAGE_PATH}>
      <CommunityPhotos />
    </StaticContentPage>
  );
}

async function CommunityPhotos() {
  const gallery = mapPhotoGallery(await fetchSanityData(PHOTO_GALLERY_QUERY));
  // The first tagged photo is the page banner, so the grid shows the rest.
  const photos = (gallery?.photos ?? [])
    .filter((photo) => photo.image?.asset && photo.pages?.includes(PAGE_PATH))
    .slice(1);

  return photos.length === 0 ? null : (
    <section className="[column-span:all]">
      <PhotoGrid items={photos} />
    </section>
  );
}
