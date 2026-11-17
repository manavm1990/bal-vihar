const AUGUST = 8;

const formatSchoolYear = (start: number) => `${start}-${String(start + 1).slice(2)}`;

export function getCurrentSchoolYear() {
  return formatSchoolYear(getCurrentStartYear());
}

export const getToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

function getCurrentStartYear() {
  const today = getToday();
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));

  return month >= AUGUST ? year : year - 1;
}

export const SCHOOL_YEARS = [
  formatSchoolYear(getCurrentStartYear() + 1),
  formatSchoolYear(getCurrentStartYear()),
  formatSchoolYear(getCurrentStartYear() - 1),
];
