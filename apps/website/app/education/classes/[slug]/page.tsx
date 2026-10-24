import Article from "@components/article";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { H2, LeadP, MutedP, P, Small, Strong, Ul } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import { formatCalendarDate } from "@lib/sanity/map-calendar-events";
import { CLASS_PAGE_QUERY, CLASS_PAGES_QUERY } from "@lib/sanity/queries";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { CLASS_PAGE_QUERY_RESULT } from "sanity.types";

type ClassLink = NonNullable<NonNullable<CLASS_PAGE_QUERY_RESULT>["links"]>[number];
type ClassSession = NonNullable<NonNullable<CLASS_PAGE_QUERY_RESULT>["sessions"]>[number];

interface ClassPageProps {
  params: Promise<{ slug: string }>;
}

export default function EducationClassPage({ params }: ClassPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading class page…</MutedP>}>
      <ClassPageContent params={params} />
    </Suspense>
  );
}

async function ClassPageContent({ params }: ClassPageProps) {
  const { slug } = await params;
  const page = await fetchClassPage(slug);
  if (!page) notFound();

  const sessions = page.sessions ?? [];
  const links = page.links ?? [];

  return (
    <Article title={page.title} className="md:columns-1">
      <Link href="/education/class-webpages" className="block w-fit">
        ← All class webpages
      </Link>
      {page.teachers ? <LeadP>Taught by {page.teachers}</LeadP> : null}
      {page.pinnedNote || sessions.length > 0 || links.length > 0 ? null : (
        <Card>
          <CardContent className="p-4">
            <MutedP>This class page is coming soon. Updates appear here after each class.</MutedP>
          </CardContent>
        </Card>
      )}
      {page.pinnedNote ? (
        <aside className="bg-primary-50 border-primary max-w-3xl rounded-md border-l-4 px-4 py-3">
          <Small className="text-primary-ink block uppercase">Pinned note</Small>
          <P className="wrap-break-word whitespace-pre-line">{page.pinnedNote}</P>
        </aside>
      ) : null}
      {sessions.length === 0 ? null : (
        <section className="space-y-4">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Latest sessions
          </H2>
          <Ul variant="unstyled" className="max-w-3xl space-y-4">
            {sessions.map((session) => (
              <li key={session._key}>
                <SessionCard session={session} />
              </li>
            ))}
          </Ul>
        </section>
      )}
      {links.length === 0 ? null : (
        <section className="space-y-4">
          <H2 variant="plain" className="text-2xl tracking-tight">
            Class links
          </H2>
          <LinkList links={links} />
        </section>
      )}
    </Article>
  );
}

interface LinkListProps {
  links: ClassLink[];
}

function LinkList({ links }: LinkListProps) {
  return (
    <Ul>
      {links.map((link) => (
        <li key={link._key}>
          <a href={stegaClean(link.url)} target="_blank" rel="noopener noreferrer">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </Ul>
  );
}

interface SessionCardProps {
  session: ClassSession;
}

function SessionCard({ session }: SessionCardProps) {
  const links = session.links ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-secondary text-lg">
          {formatCalendarDate(stegaClean(session.date))}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <P className="wrap-break-word whitespace-pre-line">
          <Strong>What we covered:</Strong> {session.covered}
        </P>
        {session.homework ? (
          <P className="wrap-break-word whitespace-pre-line">
            <Strong>Homework:</Strong> {session.homework}
          </P>
        ) : null}
        {links.length === 0 ? null : <LinkList links={links} />}
      </CardContent>
    </Card>
  );
}

async function fetchClassPage(slug: string, options?: { stega?: boolean }) {
  const result = await fetchSanityOrNull(CLASS_PAGE_QUERY, "the class page", { slug }, options);

  return result?.data ?? null;
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: CLASS_PAGES_QUERY });

  return data.flatMap(({ slug }) => (slug ? [{ slug }] : []));
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const page = await fetchClassPage((await params).slug, { stega: false });

  return !page
    ? {}
    : {
        title: `${BASE_TITLE} | ${page.title} Class Webpage`,
        description: `Class updates, homework and links for ${page.title} at ${BASE_TITLE}.`,
      };
}
