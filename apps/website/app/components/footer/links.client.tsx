"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin-resources", label: "Admin Resources" },
  { href: "/calendar", label: "Calendar" },
  { href: "/disclaimer", label: "Disclaimer Form" },
  { href: "/expense-reimbursement", label: "Submit an Expense" },
  { href: "/grievance", label: "File a Grievance" },
  { href: "/photos", label: "Photos" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/questions", label: "FAQs & Contact" },
  { href: "/terms", label: "Terms of Use" },
];

export default function Links() {
  const pathname = usePathname();

  return (
    <ul className="[&_a]:text-muted-foreground mt-4 flex flex-wrap gap-2 text-xs">
      {filterLinks(pathname).map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

const filterLinks = (currentPath: string) => LINKS.filter((link) => link.href !== currentPath);
