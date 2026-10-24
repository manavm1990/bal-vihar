import type { ReactNode } from "react";

import { H2 } from "./ui/typography";

interface PageSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

/** A page section with an anchored heading that `SectionNav` links can jump to. */
export default function PageSection({ id, title, children }: PageSectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <H2 id={id} variant="plain" className="scroll-mt-6 text-2xl tracking-tight">
        {title}
      </H2>
      {children}
    </section>
  );
}
