export type SectionId = (typeof SECTION_IDS)[number];

export interface Person {
  classes?: string[];
  role: keyof typeof ROLES;
}

export const ROLES = {
  calendar: ["calendar", "notice"],
  photos: ["banners", "photos"],
  teacher: ["classes"],
} as const satisfies Record<string, readonly SectionId[]>;

export const SECTION_IDS = [
  "adminTeam",
  "banners",
  "calendar",
  "classes",
  "eventVolunteers",
  "faculty",
  "faqs",
  "impactAward",
  "notice",
  "pages",
  "photos",
  "policies",
] as const;

export const SECTION_TYPES: Record<SectionId, string[]> = {
  adminTeam: ["volunteersList"],
  banners: ["photoGallery"],
  calendar: ["calendarEvent", "spreadsheetImport"],
  classes: ["classPage"],
  eventVolunteers: ["volunteerRoster", "spreadsheetImport"],
  faculty: ["teachingFaculty"],
  faqs: ["faqs"],
  impactAward: ["impactAward"],
  notice: ["homePage"],
  pages: ["page"],
  photos: ["photoAlbum"],
  policies: ["policies"],
};

export const UNPUBLISHED_FILTER = '_originalId in path("drafts.**") && _type in $types';

// Hides sections to keep the Studio simple; it does not restrict access. Keys are Sanity user IDs
// from the project's Members page. `classes` lists class page slugs a teacher sees; leave it out
// to show every class. Anyone not listed sees everything.
const PEOPLE: Record<string, Person> = {};

export function getAccess(userId: string | undefined, people: Record<string, Person> = PEOPLE) {
  const person = userId ? people[userId] : undefined;

  const canSee = (section: SectionId) =>
    !person || ROLES[person.role].some((allowed) => allowed === section);
  const sections = SECTION_IDS.filter(canSee);

  return {
    canSee,
    classes: person?.classes ?? null,
    types: [...new Set(sections.flatMap((section) => SECTION_TYPES[section]))],
  };
}
