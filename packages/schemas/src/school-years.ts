const AUGUST = 8;
const FIRST_LISTED_YEAR = 2010;

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

export const SCHOOL_YEARS = Array.from(
  { length: getCurrentStartYear() + 2 - FIRST_LISTED_YEAR },
  (_, index) => formatSchoolYear(getCurrentStartYear() + 1 - index),
);
