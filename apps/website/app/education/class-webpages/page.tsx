import Article from "@components/article";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { H2, MutedP, P, Ul } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { sanityFetch } from "@lib/sanity/live";
import { CLASS_PAGES_QUERY } from "@lib/sanity/queries";
import { cn } from "@lib/utils";
import { stegaClean } from "@sanity/client/stega";
import type { Metadata } from "next";
import Link from "next/link";

const GROUPS = [
  { value: "grade", heading: "Grades" },
  { value: "youth", heading: "Youth" },
  { value: "enrichment", heading: "Enrichment" },
  { value: "other", heading: "Other" },
];

export const metadata: Metadata = {
  title: `${BASE_TITLE} | Class Webpages`,
  description:
    "Find your child's class to see what was covered, homework and helpful links for every Bal Vihar class.",
};

export default async function EducationClassWebpagesPage() {
  const result = await sanityFetch({ query: CLASS_PAGES_QUERY }).catch((error: unknown) => {
    console.error("Could not load the class webpages", error);
    return null;
  });
  const classes = result?.data ?? [];

  return (
    <Article title="Class Webpages" className="md:columns-1">
      <P>
        Find your child’s class to see what was covered, homework and helpful links. Classes show
        Coming soon until their teacher posts the first update.
      </P>
      {classes.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <MutedP>No classes have been published yet. Please check back soon.</MutedP>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {GROUPS.map(({ value, heading }) => {
            const inGroup = classes.filter((item) => stegaClean(item.group) === value);

            return inGroup.length === 0 ? null : (
              <section key={value} className="space-y-4">
                <H2>{heading}</H2>
                <Ul variant="unstyled" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {inGroup.map((item) => (
                    <li key={item._id}>
                      <ClassCard
                        slug={stegaClean(item.slug)}
                        title={item.title}
                        teachers={item.teachers}
                        hasContent={item.hasContent}
                      />
                    </li>
                  ))}
                </Ul>
              </section>
            );
          })}
        </div>
      )}
    </Article>
  );
}

interface ClassCardProps {
  slug: string;
  title: string;
  teachers: string | null;
  hasContent: boolean | null;
}

function ClassCard({ slug, title, teachers, hasContent }: ClassCardProps) {
  const card = (
    <Card className={cn("h-full", hasContent && "hover:bg-muted/60 transition-colors")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {teachers ? <CardDescription>{teachers}</CardDescription> : null}
        {hasContent ? null : <CardDescription>Coming soon</CardDescription>}
      </CardHeader>
    </Card>
  );

  // Nothing to read yet, so there is nothing to click through to.
  return hasContent ? (
    <Link href={`/education/classes/${slug}`} className="hover:no-underline">
      {card}
    </Link>
  ) : (
    card
  );
}
