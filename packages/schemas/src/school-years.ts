const AUGUST = 8;

const formatSchoolYear = (start: number) => `${start}-${String(start + 1).slice(2)}`;

export function getCurrentSchoolYear() {
  return getSchoolYear(getToday());
}

export function getSchoolYear(date: string) {
  return formatSchoolYear(getStartYear(date));
}

export const getToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

function getStartYear(date: string) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));

  return month >= AUGUST ? year : year - 1;
}

export const SCHOOL_YEARS = [
  formatSchoolYear(getStartYear(getToday()) + 1),
  formatSchoolYear(getStartYear(getToday())),
  formatSchoolYear(getStartYear(getToday()) - 1),
];
