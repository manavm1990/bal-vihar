import { getViewAs, isAdministrator } from "@bv/schemas";

export type DemoView = keyof typeof DEMO_VIEWS;
export type SectionId = (typeof SECTION_IDS)[number];

export interface Person {
  classes?: readonly string[];
  name?: string;
  role: keyof typeof ROLES;
}

type User = { id: string; roles: { name: string }[] } | null | undefined;

export const ROLES = {
  bVision: ["impactAward"],
  communications: ["calendar", "faqs", "notice", "pages"],
  education: ["adminTeam", "classes", "faculty"],
  photos: ["banners", "photos"],
  president: ["presidentsMessage"],
  teacher: ["classes"],
  volunteers: ["eventVolunteers"],
} as const satisfies Record<string, readonly SectionId[]>;

export const DEMO_VIEWS = {
  bVision: { title: "B-VISION coordinator", person: { role: "bVision" } },
  communications: { title: "Communications", person: { role: "communications" } },
  education: { title: "Education lead", person: { role: "education" } },
  photos: { title: "Photos helper", person: { role: "photos" } },
  president: { title: "President", person: { role: "president" } },
  teacher: { title: "Teacher, 1 class", person: { role: "teacher", classes: ["3-a"] } },
  teacherOfTwo: {
    title: "Teacher, 2 classes",
    person: { role: "teacher", classes: ["3-a", "bhajan"] },
  },
  volunteers: { title: "Volunteer coordinator", person: { role: "volunteers" } },
} as const satisfies Record<string, { title: string; person: Person }>;

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
  "presidentsMessage",
] as const;

export const SECTION_TYPES = {
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
  presidentsMessage: ["presidentsMessage"],
} as const satisfies Record<SectionId, readonly string[]>;

export const UNPUBLISHED_FILTER = '_originalId in path("drafts.**") && _type in $types';

const PEOPLE = new Map<string, Person>([
  ["p1jnSM0Sf", { name: "Sudhir Brahmbhatt", role: "president" }],
]);

export function getAccess(
  user: User,
  {
    people = PEOPLE,
    viewAs = getViewAs(),
  }: { people?: ReadonlyMap<string, Person>; viewAs?: string | null } = {},
) {
  const person = getPerson(user, people, viewAs);

  const canSee = (section: SectionId) =>
    !person || ROLES[person.role].some((allowed) => allowed === section);
  const sections = SECTION_IDS.filter(canSee);

  return {
    canSee,
    classes: person?.classes ?? null,
    types: [...new Set(sections.flatMap((section) => SECTION_TYPES[section]))],
  } as const;
}

function getPerson(
  user: User,
  people: ReadonlyMap<string, Person>,
  viewAs: string | null,
): Person | undefined {
  if (isAdministrator(user) && isDemoView(viewAs)) return DEMO_VIEWS[viewAs].person;

  return user ? people.get(user.id) : undefined;
}

export const isDemoView = (value: unknown): value is DemoView =>
  typeof value === "string" && Object.hasOwn(DEMO_VIEWS, value);
