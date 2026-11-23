export type StudioRole = (typeof STUDIO_ROLES)[number]["value"];

export const STUDIO_ROLES = [
  { title: "B-VISION coordinator", value: "bVision" },
  { title: "Communications", value: "communications" },
  { title: "Education lead", value: "education" },
  { title: "Photos helper", value: "photos" },
  { title: "President", value: "president" },
  { title: "Teacher", value: "teacher" },
  { title: "Volunteer coordinator", value: "volunteers" },
] as const;

export const isStudioRole = (value: unknown): value is StudioRole =>
  STUDIO_ROLES.some((role) => role.value === value);
