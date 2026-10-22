import { isValidElement, type ReactNode } from "react";

export interface TheadProps {
  headers: ReactNode[];
}

export default function Thead({ headers }: TheadProps) {
  return (
    <thead>
      <tr className="even:bg-muted m-0 border-t p-0">
        {headers.map((header) => (
          <th
            key={
              isValidElement(header) && header.key != null
                ? `header-${header.key}`
                : `header-${String(header)}`
            }
            className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
