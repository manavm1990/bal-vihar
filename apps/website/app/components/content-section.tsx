import { cn } from "@lib/utils";
import { H2 } from "./ui/typography";

interface ContentSectionProps {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function ContentSection({
  id,
  title,
  className = "space-y-6",
  children,
}: ContentSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("scroll-mt-6", className)}>
      <H2 id={`${id}-heading`}>{title}</H2>
      {children}
    </section>
  );
}
