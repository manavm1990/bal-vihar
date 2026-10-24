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

export const CLASS_PAGE_QUERY = defineQuery(`*[_type == "classPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  teachers,
  pinnedNote,
  links[]{
    _key,
    label,
    url
  },
  "sessions": sessions[] | order(date desc){
    _key,
    date,
    covered,
    homework,
    links[]{
      _key,
      label,
      url
    }
  }
}`);

export const CLASS_PAGES_QUERY = defineQuery(`*[_type == "classPage"] | order(sortOrder asc){
  _id,
  title,
  "slug": slug.current,
  group,
  teachers,
  "hasContent": count(sessions) > 0 || count(links) > 0 || defined(pinnedNote)
}`);

export const VOLUNTEERS_LIST_QUERY = defineQuery(`*[_id == "volunteersList"][0]{
  _id,
  teams[]{
    _key,
    name,
    description,
    members[]{
      _key,
      name,
      email,
      phone
    }
  }
}`);

export const VOLUNTEER_ROSTER_QUERY = defineQuery(`*[_id == "volunteerRoster"][0]{
  _id,
  schoolYear,
  activities[]{
    _key,
    name,
    volunteers
  }
}`);

export const TEACHING_FACULTY_QUERY = defineQuery(`*[_id == "teachingFaculty"][0]{
  _id,
  schoolYear,
  groups[]{
    _key,
    name,
    kind,
    teams[]{
      _key,
      subject,
      section,
      teachers[]{ _key, isBackup, name, email, phone },
      assistants[]{ _key, name, level }
    }
  },
  programs[]{
    _key,
    name,
    coordinators[]{ _key, name, email, phone },
    team[]{ _key, name, email, phone },
    assistants[]{ _key, name, level }
  }
}`);

export const FAQS_QUERY = defineQuery(`*[_id == "faqs"][0]{
  _id,
  items[]{
    _key,
    question,
    answer
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
  }
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
