import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { H5, MutedP, Small } from "@components/ui/typography";
import { cn } from "@lib/utils";
import Image from "next/image";

interface PhotoSlot {
  title: string;
  schoolYear: string;
  note: string;
  status: "available" | "needed";
  alt?: string;
  src?: string;
}

const PHOTO_SLOTS: readonly PhotoSlot[] = [
  {
    title: "Republic Day",
    schoolYear: "2014",
    note: "Live hero photo",
    status: "available",
    alt: "Bal Vihar students and community members celebrating Republic Day in 2014.",
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2014-republic-day.jpeg",
  },
  {
    title: "Diwali",
    schoolYear: "2015",
    note: "Live hero photo",
    status: "available",
    alt: "Bal Vihar students and families celebrating Diwali in 2015.",
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg",
  },
  {
    title: "CANstruction",
    schoolYear: "2016",
    note: "Live hero photo",
    status: "available",
    alt: "Bal Vihar CANstruction project display from 2016.",
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2016-canstruction.jpg",
  },
  {
    title: "CANstruction Volunteers",
    schoolYear: "Recent",
    note: "Live hero photo",
    status: "available",
    alt: "Bal Vihar volunteers gathered around a CANstruction community service project.",
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2Fcanstruction-team.jpg",
  },
  {
    title: "Holi Celebration",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "Family Night",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "Annual Day",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "First Day of School",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "Graduation / Showcase",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "International Yoga Day",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "Walk for Water",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
  {
    title: "Community Picnic",
    schoolYear: "TBD",
    note: "Updated photo needed",
    status: "needed",
  },
] as const;

const AVAILABLE_COUNT = PHOTO_SLOTS.filter((slot) => slot.status === "available").length;
const NEEDED_COUNT = PHOTO_SLOTS.length - AVAILABLE_COUNT;

export function PhotoPlaceholderBoard() {
  return (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Photo Coverage Tracker</CardTitle>
        <CardDescription>
          Planning board for photo migration. This highlights what is currently live and what still
          needs updated photos.
        </CardDescription>
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Small>
            Available now: <strong>{AVAILABLE_COUNT}</strong>
          </Small>
          <Small>
            Placeholders needed: <strong>{NEEDED_COUNT}</strong>
          </Small>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PHOTO_SLOTS.map((slot) => (
            <li key={`${slot.title}-${slot.schoolYear}`}>
              <PhotoSlotCard slot={slot} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PhotoSlotCard({ slot }: { slot: PhotoSlot }) {
  return (
    <Card className="h-full">
      {slot.status === "available" && slot.src && slot.alt ? (
        <div className="relative aspect-video overflow-hidden rounded-t-lg border-b">
          <Image src={slot.src} alt={slot.alt} fill sizes="(max-width: 1280px) 50vw, 33vw" />
        </div>
      ) : (
        <div className="bg-muted/40 text-muted-foreground flex aspect-video items-center justify-center rounded-t-lg border-b border-dashed px-4 text-center">
          <Small>Placeholder image slot</Small>
        </div>
      )}

      <CardContent className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <H5 className="text-base">{slot.title}</H5>
          <Small
            className={cn(
              "rounded-full px-2 py-1 text-xs",
              slot.status === "available"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {slot.status === "available" ? "Available" : "Needed"}
          </Small>
        </div>
        <MutedP>School year: {slot.schoolYear}</MutedP>
        <MutedP>{slot.note}</MutedP>
      </CardContent>
    </Card>
  );
}
