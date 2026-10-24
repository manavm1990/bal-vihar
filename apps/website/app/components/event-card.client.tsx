"use client";

import {
  createCalendarEventDownloadHref,
  formatCalendarDate,
} from "@lib/sanity/map-calendar-events";
import type { CalendarEventData } from "@lib/sanity/types";
import { cn } from "@lib/utils";
import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { type KeyboardEvent, type MouseEvent, useRef } from "react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { H2, MutedP, P } from "./ui/typography";

type EventTypeKey = keyof typeof EVENT_TYPE_LABELS;

interface EventCardProps {
  event: CalendarEventData;
}

const EVENT_TYPE_LABELS = {
  celebration: "Celebration",
  holiday: "Holiday",
  project: "Project",
  regular: "Classes",
  special: "Special",
} as const;

export default function EventCard({ event }: EventCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const parsed = new Date(`${event.date}T12:00:00`);
  const hasDate = !Number.isNaN(parsed.getTime());
  const downloadName = `${event.date}-${event.title.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  const meta = [formatCalendarDate(event.date), event.time, event.location]
    .filter(Boolean)
    .join(" · ");
  const typeLabel = eventTypeLabel(event.eventType);
  const isSpecial = Boolean(event.eventType && event.eventType !== "regular");
  const showType = typeLabel !== null && isSpecial;
  const note = event.description?.trim() || null;
  const highlighted = Boolean(event.isHighlighted);
  const openDetails = () => dialogRef.current?.showModal();
  const closeDetails = () => dialogRef.current?.close();
  const handleBackdropClick = (click: MouseEvent<HTMLDialogElement>) => {
    if (click.target === click.currentTarget) closeDetails();
  };

  const handleDialogKeyDown = (keyEvent: KeyboardEvent<HTMLDialogElement>) => {
    if (keyEvent.key === "Escape") closeDetails();
  };

  return (
    <>
      <Card
        className={cn(
          "relative flex h-full gap-3 p-3 pr-10",
          highlighted && "border-primary-300 bg-primary-50/60 border-2 shadow-none",
        )}
      >
        {hasDate ? (
          <time
            dateTime={event.date}
            className="bg-primary text-primary-foreground flex size-14 shrink-0 flex-col items-center justify-center rounded-md leading-none"
          >
            <span className="text-xs font-semibold uppercase">
              {parsed.toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="font-eczar text-2xl font-bold">{parsed.getDate()}</span>
          </time>
        ) : null}

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-foreground text-base leading-snug font-semibold">{event.title}</h3>
            {showType && typeLabel ? (
              <span className="bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
                {typeLabel}
              </span>
            ) : null}
          </div>
          {meta ? <MutedP className="text-sm leading-snug">{meta}</MutedP> : null}
          {note ? (
            <MutedP className="line-clamp-3 text-sm leading-snug whitespace-pre-line">
              {note}
            </MutedP>
          ) : null}
          {isSpecial ? (
            <button
              type="button"
              onClick={openDetails}
              className="text-primary-ink pt-1 text-sm font-semibold"
            >
              Event details
            </button>
          ) : null}
        </div>

        <a
          href={createCalendarEventDownloadHref(event)}
          download={downloadName}
          aria-label={`Add ${event.title} to calendar`}
          title="Add to calendar"
          className="text-primary-ink hover:bg-primary-50 absolute top-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-md"
        >
          <CalendarIcon aria-hidden="true" className="size-4" />
        </a>
      </Card>

      {isSpecial ? (
        <dialog
          ref={dialogRef}
          aria-labelledby={`event-detail-${event.id}`}
          onClick={handleBackdropClick}
          onKeyDown={handleDialogKeyDown}
          className="border-border bg-background text-foreground m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border p-0 shadow-lg backdrop:bg-black/50"
        >
          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                {showType && typeLabel ? (
                  <span className="bg-secondary text-secondary-foreground inline-block rounded px-1.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
                    {typeLabel}
                  </span>
                ) : null}
                <H2
                  id={`event-detail-${event.id}`}
                  variant="plain"
                  className="text-2xl tracking-tight"
                >
                  {event.title}
                </H2>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={closeDetails}>
                <Cross2Icon aria-hidden="true" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground font-medium">When</dt>
                <dd>
                  {formatCalendarDate(event.date)}
                  {event.time ? ` · ${event.time}` : ""}
                </dd>
              </div>
              {event.location ? (
                <div>
                  <dt className="text-muted-foreground font-medium">Where</dt>
                  <dd>{event.location}</dd>
                </div>
              ) : null}
            </dl>

            {note ? (
              <P className="whitespace-pre-line">{note}</P>
            ) : (
              <MutedP>More details will be posted here when the school adds them in Studio.</MutedP>
            )}

            <a
              href={createCalendarEventDownloadHref(event)}
              download={downloadName}
              className="text-primary-ink inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              <CalendarIcon aria-hidden="true" className="size-4" />
              Add to calendar
            </a>
          </div>
        </dialog>
      ) : null}
    </>
  );
}

const eventTypeLabel = (value: string | null | undefined) => {
  if (!value || !(value in EVENT_TYPE_LABELS)) return null;
  // Keys are validated against EVENT_TYPE_LABELS above.
  return EVENT_TYPE_LABELS[value as EventTypeKey];
};
