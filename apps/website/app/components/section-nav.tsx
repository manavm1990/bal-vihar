interface SectionNavLink {
  href: string;
  title: string;
}

interface SectionNavProps {
  label: string;
  links: readonly SectionNavLink[];
}

export default function SectionNav({ label, links }: SectionNavProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="border-border text-navy-600 hover:bg-accent hover:text-primary-ink inline-block rounded-full border px-4 py-1.5 text-sm font-medium hover:no-underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
