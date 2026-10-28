import { SanityImage } from "@components/sanity-image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { H5, MutedP } from "@components/ui/typography";
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
  const withImages = items.filter((item) => item.image?.asset);

  return withImages.length === 0 ? null : (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {withImages.map((item) => (
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
        {item.image ? (
          <SanityImage
            value={item.image}
            fallbackAlt={item.title}
            fill
            width={640}
            height={360}
            sizes="(max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <CardContent className="space-y-2 p-4">
        <H5 className="text-base">{item.title}</H5>
        {item.schoolYear ? <MutedP>School year: {item.schoolYear}</MutedP> : null}
      </CardContent>
    </Card>
  );
}
