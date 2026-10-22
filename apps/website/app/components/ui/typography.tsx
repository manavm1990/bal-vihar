import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, isValidElement, type ReactNode } from "react";

type H2Variant = NonNullable<VariantProps<typeof h2Variants>["variant"]>;

interface H2Props extends ComponentPropsWithoutRef<"h2"> {
  variant?: H2Variant;
}

interface TableProps {
  headers: ReactNode[];
  rows: ReactNode[][];
  footer?: ReactNode;
}

/**
 * Bq — Pull quote on a soft saffron tint.
 *
 * @example
 * <Bq>Where there is light, there is learning.</Bq>
 */
export function Bq({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn("bg-primary-50 mt-4 rounded-md px-4 py-3 italic", className)}
      {...props}
    />
  );
}

/**
 * H1 — Page title. One per page.
 *
 * @example
 * <H1>Calendar</H1>
 */
export function H1({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn("scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl", className)}
      {...props}
    />
  );
}

/**
 * H2 — Section heading. `underlined` (default) adds a bottom rule; `plain` drops it.
 *
 * @example
 * <H2 variant="plain">Upcoming events</H2>
 */
export function H2({ className, variant, ...props }: H2Props) {
  return <h2 className={cn(h2Variants({ variant }), className)} {...props} />;
}

/**
 * H3 — Subsection heading.
 *
 * @example
 * <H3>History</H3>
 */
export function H3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
  );
}

/**
 * H4 — Minor heading.
 *
 * @example
 * <H4>Our teachers</H4>
 */
export function H4({ className, ...props }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  );
}

/**
 * H5 — Smallest heading.
 *
 * @example
 * <H5>Classroom</H5>
 */
export function H5({ className, ...props }: ComponentPropsWithoutRef<"h5">) {
  return (
    <h5 className={cn("scroll-m-20 text-lg font-semibold tracking-tight", className)} {...props} />
  );
}

/**
 * LeadP — Intro paragraph under a page title.
 *
 * @example
 * <LeadP>Teaching Indian culture and values to children.</LeadP>
 */
export function LeadP({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-muted-foreground text-lg sm:text-xl", className)} {...props} />;
}

/**
 * MutedP — Caption or description text.
 *
 * @example
 * <MutedP>Updated each term.</MutedP>
 */
export function MutedP({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

/**
 * P — Body paragraph, capped at a readable line length.
 *
 * @example
 * <P>Classes meet on Saturdays.</P>
 */
export function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("max-w-prose leading-6", className)} {...props} />;
}

/**
 * Small — Short label text.
 *
 * @example
 * <Small>Featured</Small>
 */
export function Small({ className, ...props }: ComponentPropsWithoutRef<"small">) {
  return <small className={cn("text-sm leading-tight font-medium", className)} {...props} />;
}

/**
 * Strong — Inline emphasis.
 *
 * @example
 * <P>Bal Vihar is a <Strong>non-profit</Strong> corporation.</P>
 */
export function Strong({ className, ...props }: ComponentPropsWithoutRef<"strong">) {
  return <strong className={cn("font-semibold", className)} {...props} />;
}

/**
 * Table — Bordered data table with zebra rows and an optional footer.
 *
 * @example
 * <Table headers={["Grade", "Fee"]} rows={[["K", "$200"]]} />
 */
export function Table({ headers, rows, footer }: TableProps) {
  return (
    <div className="my-4 w-full overflow-y-auto">
      <table className="w-full">
        <Thead headers={headers} />
        <Tbody rows={rows} />
      </table>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

const h2Variants = cva("scroll-m-20 text-3xl font-semibold tracking-wider first:mt-0", {
  variants: {
    variant: {
      underlined: "border-b pb-2",
      plain: "",
    },
  },
  defaultVariants: {
    variant: "underlined",
  },
});

function getNodeSignature(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return String(node);

  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint")
    return String(node);

  if (Array.isArray(node)) return node.map(getNodeSignature).join("|");

  if (isValidElement(node) && node.key != null) return `react-key:${String(node.key)}`;

  return typeof node;
}

function Tbody({ rows }: Pick<TableProps, "rows">) {
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

function Thead({ headers }: Pick<TableProps, "headers">) {
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
