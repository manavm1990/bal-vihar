const AUGUST = 8;

const formatSchoolYear = (start: number) => `${start}-${String(start + 1).slice(2)}`;

export function getCurrentSchoolYear() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));

  return formatSchoolYear(month >= AUGUST ? year : year - 1);
}

export const SCHOOL_YEARS = [getCurrentSchoolYear()];
