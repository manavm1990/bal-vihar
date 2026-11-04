export interface CalendarEventData {
  id: string;
  title: string;
  date: string;
  location?: string | null;
  eventType?: string | null;
  time?: string | null;
  description?: string | null;
  isHighlighted?: boolean | null;
  academicYear?: string | null;
}

export interface HomePageData {
  id: string;
  title?: string | null;
  noticeText?: string | null;
  noticeHref?: string | null;
  noticeLabel?: string | null;
}

export interface HomePhotoBoardItem {
  key: string;
  title: string;
  schoolYear?: string | null;
  note?: string | null;
  pages?: string[];
  image?: SanityImageValue | null;
}

export interface PhotoGalleryData {
  id: string;
  title?: string | null;
  photos?: HomePhotoBoardItem[] | null;
}

export interface SanityImageValue {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width?: number;
        height?: number;
      } | null;
    } | null;
  } | null;
  alt?: string | null;
  caption?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  } | null;
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } | null;
}
