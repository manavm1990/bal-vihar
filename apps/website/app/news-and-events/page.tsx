import Article from "@components/article";
import { SanityImage } from "@components/sanity/sanity-image";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { MutedP, P, Small } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityData } from "@lib/sanity/fetch";
import { mapNewsEvents } from "@lib/sanity/map-news-events";
import { NEWS_EVENTS_QUERY } from "@lib/sanity/queries";
import type { NewsEventData } from "@lib/sanity/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | News & Events`,
  description: "Upcoming Bal Vihar programs, community news, and event recaps.",
};

export default async function NewsAndEventsPage() {
  const posts = mapNewsEvents(await fetchSanityData(NEWS_EVENTS_QUERY));

  return (
    <Article title="News & Events" className="md:columns-1">
      <P>Program updates, celebrations, and community news.</P>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No news posts yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </Article>
  );
}

function NewsCard({ post }: { post: NewsEventData }) {
  const dateLabel = formatPublishedAt(post.publishedAt);

  return (
    <Card className="h-full overflow-hidden">
      {post.image?.asset?._id ? (
        <div className="relative aspect-video border-b">
          <SanityImage
            value={post.image}
            fill
            width={640}
            height={360}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <CardHeader className="space-y-1 p-4 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Small className="text-slate-600">{dateLabel}</Small>
          {post.isFeatured ? (
            <Small className="bg-primary-50 text-primary-ink rounded-full px-2 py-0.5">
              Featured
            </Small>
          ) : null}
        </div>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0">
        <P>{post.summary}</P>
        {post.body ? <MutedP className="whitespace-pre-line">{post.body}</MutedP> : null}
        {post.externalUrl ? (
          <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
            Read more
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}

function formatPublishedAt(value: string) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;

  return new Date(parsed).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
