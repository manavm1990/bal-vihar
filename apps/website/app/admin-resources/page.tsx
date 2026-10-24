import Article from "@components/article";
import { H2, MutedP, P, Ul } from "@components/ui/typography";
import { ADMIN_DOCUMENTS, ADMIN_FORMS } from "@lib/admin-resources-content";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Admin Resources";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Forms for teachers and staff, and the incorporation, tax-exempt status and financial review documents of Bal Vihar of St. Louis.",
};

export default function AdminResourcesPage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <section className="space-y-4">
        <H2>Forms</H2>
        <Ul variant="unstyled" className="divide-border divide-y">
          {ADMIN_FORMS.map((form) => (
            <li key={form.href} className="py-4 first:pt-0">
              <Link href={form.href} className="text-lg font-semibold">
                {form.title}
              </Link>
              <P className="mt-1">{form.description}</P>
            </li>
          ))}
        </Ul>
      </section>

      <section className="mt-10 space-y-4">
        <H2>Official documents</H2>
        <P>
          Bal Vihar of St. Louis is a Missouri nonprofit corporation and a 501(c)(3) tax-exempt
          organization. These are copies of the original documents.
        </P>
        <Ul variant="unstyled" className="divide-border divide-y">
          {ADMIN_DOCUMENTS.map((document) => (
            <li key={document.href} className="py-4 first:pt-0">
              <a
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold"
              >
                {document.title} (PDF)
              </a>
              <MutedP className="mt-1">{document.issued}</MutedP>
              <P className="mt-1">{document.description}</P>
            </li>
          ))}
        </Ul>
      </section>
    </Article>
  );
}
