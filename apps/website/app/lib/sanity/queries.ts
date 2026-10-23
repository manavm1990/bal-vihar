import { defineQuery } from "next-sanity";

const mediaImageProjection = /* groq */ `{
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height }
    }
  },
  alt,
  caption,
  hotspot,
  crop
}`;

export const CALENDAR_EVENTS_QUERY = defineQuery(`*[_type == "calendarEvent"] | order(date asc) {
  _id,
  title,
  date,
  location,
  eventType,
  time,
  description,
  isHighlighted,
  academicYear
}`);

export const VOLUNTEERS_LIST_QUERY = defineQuery(`*[_id == "volunteersList"][0]{
  _id,
  groups[]{
    _key,
    title,
    members[]{
      _key,
      name,
      email,
      phone
    }
  }
}`);

export const POLICIES_QUERY = defineQuery(`*[_id == "policies"][0]{
  _id,
  intro,
  sections[]{
    _key,
    title,
    "slug": slug.current,
    intro,
    callToAction{
      text,
      label,
      href
    },
    items[]{
      _key,
      title,
      body
    }
  }
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
  _id,
  title,
  heroSlides[]{
    _key,
    link,
    image ${mediaImageProjection}
  },
  announcements[]{
    _key,
    title,
    body,
    ctaLabel,
    ctaHref,
    isActive,
    startDate,
    endDate,
    tone
  },
  whoWeAre
}`);

export const NEWS_EVENTS_QUERY = defineQuery(`*[_type == "event"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  body,
  isFeatured,
  externalUrl,
  image ${mediaImageProjection}
}`);

export const PHOTO_GALLERY_QUERY = defineQuery(`*[_id == "photoGallery"][0]{
  _id,
  title,
  photos[]{
    _key,
    title,
    schoolYear,
    note,
    featured,
    pages,
    image ${mediaImageProjection}
  }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  _id,
  title,
  registrationUrl,
  contactEmail,
  defaultOgImage ${mediaImageProjection}
}`);
