import { isValidElement, type ReactNode } from "react";

export interface TbodyProps {
  rows: ReactNode[][];
}

export default function Tbody({ rows }: TbodyProps) {
  const rowKeyCounts = new Map<string, number>();

  return (
    <tbody>
      {rows.map((row) => {
        const rowSignature = row.map(getNodeSignature).join("||");
        const rowOccurrence = (rowKeyCounts.get(rowSignature) ?? 0) + 1;
        rowKeyCounts.set(rowSignature, rowOccurrence);

        const cellKeyCounts = new Map<string, number>();

        return (
          <tr
            key={`row-${rowSignature}-${rowOccurrence}`}
            className="even:bg-muted m-0 border-t p-0"
          >
            {row.map((cell) => {
              const cellSignature = getNodeSignature(cell);
              const cellOccurrence = (cellKeyCounts.get(cellSignature) ?? 0) + 1;
              cellKeyCounts.set(cellSignature, cellOccurrence);

              return (
                <td
                  key={`cell-${cellSignature}-${cellOccurrence}`}
                  className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right"
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function getNodeSignature(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return String(node);

  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint")
    return String(node);

  if (Array.isArray(node)) return node.map(getNodeSignature).join("|");

  if (isValidElement(node) && node.key != null) return `react-key:${String(node.key)}`;

  return typeof node;
}
