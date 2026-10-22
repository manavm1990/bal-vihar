import { SanityImage } from "@components/sanity/sanity-image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { H5, MutedP, Small } from "@components/ui/typography";
import type { HomePhotoBoardItem } from "@lib/sanity/types";

interface PhotoGridProps {
  items: HomePhotoBoardItem[];
  title?: string;
  description?: string;
}

export function PhotoGrid({
  items,
  title = "Community photos",
  description = "Highlights from Bal Vihar events and service projects.",
}: PhotoGridProps) {
  return items.length === 0 ? null : (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.key}>
              <PhotoCard item={item} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface PhotoCardProps {
  item: HomePhotoBoardItem;
}

function PhotoCard({ item }: PhotoCardProps) {
  return (
    <Card className="h-full">
      <div className="relative aspect-video overflow-hidden rounded-t-lg border-b">
        {item.image?.asset?._id || item.image?.asset?.url ? (
          <SanityImage
            value={item.image}
            fallbackAlt={item.title}
            fill
            width={640}
            height={360}
            sizes="(max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="bg-muted/40 text-muted-foreground flex size-full items-center justify-center px-4 text-center">
            <Small>Photo coming soon</Small>
          </div>
        )}
      </div>

      <CardContent className="space-y-2 p-4">
        <H5 className="text-base">{item.title}</H5>
        {item.schoolYear ? <MutedP>School year: {item.schoolYear}</MutedP> : null}
        {item.note ? <MutedP>{item.note}</MutedP> : null}
      </CardContent>
    </Card>
  );
}
