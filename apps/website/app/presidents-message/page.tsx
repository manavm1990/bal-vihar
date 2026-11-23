import Article from "@components/article";
import PageBody from "@components/page-body";
import { H3, MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { PAGE_DESCRIPTIONS } from "@lib/page-descriptions";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { PRESIDENTS_MESSAGE_QUERY } from "@lib/sanity/queries";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import { Suspense } from "react";

const TITLE = "President's Message";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE} 📜`,
  description: PAGE_DESCRIPTIONS.presidentsMessage,
};

export default function PresidentsMessagePage() {
  return (
    <Article title={TITLE}>
      <Suspense fallback={<MutedP>Loading the message…</MutedP>}>
        <PresidentsMessage />
      </Suspense>
    </Article>
  );
}

async function PresidentsMessage() {
  const result = await fetchSanityOrNull(PRESIDENTS_MESSAGE_QUERY, "the president's message");
  const message = result?.data;

  return !message?.body ? (
    <MutedP>The president&apos;s message will be posted here soon.</MutedP>
  ) : (
    <>
      {message.date ? (
        <H3>
          <time dateTime={stegaClean(message.date)}>{formatMessageDate(message.date)}</time>
        </H3>
      ) : null}
      <PageBody value={message.body} />
      {message.signedBy ? (
        <footer className="italic">
          Best Regards,
          <br />
          {message.signedBy}
        </footer>
      ) : null}
    </>
  );
}

const formatMessageDate = (date: string) =>
  new Date(`${stegaClean(date)}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
