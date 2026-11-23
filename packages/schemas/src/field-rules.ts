type User = { roles: { name: string }[] } | null | undefined;

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SITE_HOSTS = ["balvihar-stlouis.com", "www.balvihar-stlouis.com"];

export const describeMissingSlash = (href: unknown) =>
  typeof href !== "string" || href === "" || HAS_SCHEME.test(href) || /^[/#]/.test(href)
    ? null
    : "Start links to this site with /, like /calendar. For other sites, paste the full address starting with https://.";

export function describeRepeatedDates(items: unknown) {
  const dates = Array.isArray(items)
    ? items.flatMap((item) =>
        isRecord(item) && typeof item["date"] === "string" ? [item["date"]] : [],
      )
    : [];
  const repeated = [...new Set(dates.filter((date, index) => dates.indexOf(date) !== index))];

  return repeated.length === 0
    ? null
    : `More than one update is dated ${repeated.join(", ")}. Add to the existing update or fix the date.`;
}

export function describeUnevenRows(rows: unknown, table: unknown) {
  const headers = isRecord(table) && Array.isArray(table["headers"]) ? table["headers"] : [];
  if (!Array.isArray(rows) || headers.length === 0) return null;

  const uneven = rows.flatMap((row, index) => {
    const cells = isRecord(row) && Array.isArray(row["cells"]) ? row["cells"].length : 0;
    return cells === headers.length ? [] : [`row ${index + 1} has ${cells}`];
  });

  return uneven.length === 0
    ? null
    : `The table has ${headers.length} columns, but ${uneven.join(", ")}. Give every row one cell per column.`;
}

export const getFirstSegment = (path: string) => path.split(/[/?#]/)[1] ?? "";

export const hasSlug = (value: unknown) =>
  typeof value === "object" && value !== null && "current" in value && Boolean(value.current);

export const isAdministrator = (user: User) =>
  Boolean(user?.roles.some(({ name }) => name === "administrator"));

export function parseSitePath(href: unknown) {
  if (typeof href !== "string") return null;
  if (href.startsWith("/")) return href;
  if (!URL.canParse(href)) return null;

  const { hash, hostname, pathname, search } = new URL(href);
  return SITE_HOSTS.includes(hostname) ? `${pathname}${search}${hash}` : null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
