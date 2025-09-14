export interface TbodyProps {
  rows: string[][]
}

export default function Tbody({ rows }: TbodyProps) {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex} className="even:bg-muted m-0 border-t p-0">
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
