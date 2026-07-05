export interface TbodyProps {
  rows: string[][];
}

export default function Tbody({ rows }: TbodyProps) {
  return (
    <tbody>
      {rows.map((row) => {
        const rowKey = row.join("|");
        return (
          <tr key={rowKey} className="even:bg-muted m-0 border-t p-0">
            {row.map((cell) => (
              <td
                key={`${rowKey}-${cell}`}
                className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {cell}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
