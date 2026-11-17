type User = { roles: { name: string }[] } | null | undefined;

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

export const hasSlug = (value: unknown) =>
  typeof value === "object" && value !== null && "current" in value && Boolean(value.current);

export const isAdministrator = (user: User) =>
  Boolean(user?.roles.some(({ name }) => name === "administrator"));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
