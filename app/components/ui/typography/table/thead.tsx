export interface TheadProps {
  headers: string[]
}

export default function Thead({ headers }: TheadProps) {
  return (
    <thead>
      <tr className="even:bg-muted m-0 border-t p-0">
        {headers.map((header, index) => (
          <th
            key={index}
            className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
