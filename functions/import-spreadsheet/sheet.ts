export type Row = unknown[];

interface Heading {
  pattern: RegExp;
  required?: boolean;
}

// Yes, this is better than functional error handling for this case.
export class SheetError extends Error {}

const HEADER_SCAN_ROWS = 10;

/**
 * Finds the heading row among the first rows,
 * so a title above the table is fine.
 */
export function locateColumns(rows: Row[], headings: Heading[]) {
  for (const [start, row] of rows.slice(0, HEADER_SCAN_ROWS).entries()) {
    const labels = row.map(toText);
    const columns = headings.map(({ pattern }) => labels.findIndex((label) => pattern.test(label)));

    if (headings.every(({ required }, index) => !required || columns[index] !== -1))
      return { columns, start };
  }

  return null;
}

export const toText = (cell: unknown) =>
  typeof cell === "string"
    ? cell.replace(/\s+/g, " ").trim()
    : typeof cell === "number"
      ? String(cell)
      : "";
