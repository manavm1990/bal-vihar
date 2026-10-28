import type { HomeAnnouncement } from "./types";

export function isAnnouncementVisible(
  announcement: HomeAnnouncement,
  now: Date = new Date(),
): boolean {
  if (announcement.isActive === false) return false;

  const nowMs = now.getTime();

  if (announcement.startDate) {
    const start = Date.parse(announcement.startDate);
    if (!Number.isNaN(start) && nowMs < start) return false;
  }

  if (announcement.endDate) {
    const end = Date.parse(announcement.endDate);
    if (!Number.isNaN(end) && nowMs > end) return false;
  }

  return true;
}
