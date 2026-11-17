import Article from "@components/article";
import Callout from "@components/callout";
import PageBody from "@components/page-body";
import { MutedP, P } from "@components/ui/typography";
import { getCachedNow } from "@lib/clock";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { sanityFetchStaticParams } from "@lib/sanity/live";
import { formatCalendarDate } from "@lib/sanity/map-calendar-events";
import { isPageCurrent } from "@lib/sanity/pages";
import { PAGE_QUERY, PAGES_QUERY } from "@lib/sanity/queries";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { PAGE_QUERY_RESULT } from "sanity.types";

type PageEvent = NonNullable<NonNullable<PAGE_QUERY_RESULT>["event"]>;

interface EditorPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  return (
    <Suspense fallback={<MutedP>Loading page…</MutedP>}>
      <EditorPageContent params={params} />
    </Suspense>
  );
}

async function EditorPageContent({ params }: EditorPageProps) {
  const { slug } = await params;
  const [page, now] = await Promise.all([fetchPage(slug), getCachedNow()]);
  if (!page) notFound();

  return (
    <Article title={page.title} className="md:columns-1">
      {isPageCurrent(page.endsOn, now) ? null : (
        <Callout title={page.event ? "This event has passed" : "This page is no longer current"}>
          <P>Thanks for visiting. Check the calendar for what is coming up next.</P>
        </Callout>
      )}
      {page.event ? <EventSummary event={page.event} /> : null}
      <PageBody value={page.body} />
    </Article>
  );
}

interface EventSummaryProps {
  event: PageEvent;
}

function EventSummary({ event }: EventSummaryProps) {
  const summary = [formatCalendarDate(stegaClean(event.date)), event.time, event.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <P className="font-medium">
      <Link href={`/calendar/${event._id}`}>{summary}</Link>
    </P>
  );
}

async function fetchPage(slug: string, options?: { stega?: boolean }) {
  const result = await fetchSanityOrNull(PAGE_QUERY, "the page", { slug }, options);

  return result?.data ?? null;
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: PAGES_QUERY });
  const params = data.flatMap(({ slug }) => (slug ? [{ slug }] : []));

  // Cache Components rejects an empty list, so a slug that matches no page (and 404s) keeps the build valid until the first page exists.
  return params.length > 0 ? params : [{ slug: "no-page-yet" }];
}

export async function generateMetadata({ params }: EditorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [page, now] = await Promise.all([fetchPage(slug, { stega: false }), getCachedNow()]);
  if (!page) return {};

  const title = `${page.title} | ${BASE_TITLE}`;

  return {
    title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    robots: isPageCurrent(page.endsOn, now) ? undefined : { index: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BASE_TITLE,
      url: `/${slug}`,
      title,
      description: page.description,
    },
  };
}
