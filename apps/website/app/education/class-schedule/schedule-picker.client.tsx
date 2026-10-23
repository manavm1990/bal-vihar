"use client";

import { Button } from "@components/ui/button";
import { H2, H3, MutedP, Ol } from "@components/ui/typography";
import { cn } from "@lib/utils";
import { useState } from "react";

type SlotKind = "class" | "end" | "pause" | "practice";

interface Slot {
  time: string;
  kind: SlotKind;
  title: string;
  where?: string | undefined;
}

interface Group {
  id: string;
  label: string;
  note?: string;
  slots: readonly Slot[];
}

const slot = (time: string, kind: SlotKind, title: string, where?: string): Slot => ({
  time,
  kind,
  title,
  where,
});

const lowerDay = (room: number, later: Slot): Slot[] => [
  slot("10:00 a.m.", "class", "Arathi", `Room #${room}`),
  slot("10:05 a.m.", "class", "Class instruction", `Room #${room}`),
  slot("10:55 a.m.", "pause", "Break"),
  slot("11:05 a.m.", "pause", "Transition to yoga / bhajan"),
  slot("11:15 a.m.", "practice", "Bhajan", "Stage Right, Room #6"),
  later,
  slot("12:20 p.m.", "end", "Dismissal"),
];

const upperDay = (
  assembly: string,
  first: readonly [string, string],
  second: readonly [string, string],
  room: string,
): Slot[] => [
  slot("10:00 a.m.", "class", "Assembly", assembly),
  slot("10:05 a.m.", "practice", first[0], first[1]),
  slot("10:35 a.m.", "practice", second[0], second[1]),
  slot("11:05 a.m.", "pause", "Transition to class"),
  slot("11:10 a.m.", "pause", "Break"),
  slot("11:20 a.m.", "class", "Class instruction", room),
  slot("12:30 p.m.", "end", "Dismissal"),
];

const DEFAULT_GROUP: Group = {
  id: "K-1",
  label: "K–1",
  note: "Pick-up is from the Parents’ lounge.",
  slots: lowerDay(5, slot("11:45 a.m.", "practice", "Yoga", "Stage Right, Room #6")),
};

const GROUPS: readonly Group[] = [
  DEFAULT_GROUP,
  {
    id: "1A",
    label: "1A",
    slots: lowerDay(10, slot("11:45 a.m.", "practice", "Bhajan", "Stage Left, Room #9")),
  },
  {
    id: "2A",
    label: "2A",
    slots: lowerDay(11, slot("11:45 a.m.", "practice", "Yoga", "Stage Area Center")),
  },
  {
    id: "3A",
    label: "3A",
    slots: lowerDay(4, slot("11:45 a.m.", "practice", "Bhajan", "Center Hall")),
  },
  {
    id: "4A",
    label: "4A",
    slots: upperDay(
      "Stage Area Center (Room #8)",
      ["Bhajan", "Stage Area Center (Room #8)"],
      ["Yoga", "Stage Area Center (Room #4)"],
      "Room #10",
    ),
  },
  {
    id: "5A",
    label: "5A",
    slots: upperDay("Hall Area 1", ["Yoga", "Hall Area 1"], ["Bhajan", "Room #3"], "Room #10"),
  },
  {
    id: "6A",
    label: "6A",
    slots: upperDay("Hall Area 2", ["Yoga", "Hall Area 2"], ["Bhajan", "Room #2"], "Room #10"),
  },
  {
    id: "7A",
    label: "7A",
    slots: upperDay(
      "Stage Area Left",
      ["Bhajan", "Stage Area Left"],
      ["Yoga", "Stage Area Left"],
      "Room #10",
    ),
  },
];

const SLOT_STYLES: Record<SlotKind, string> = {
  class: "bg-background",
  end: "bg-secondary text-secondary-foreground border-secondary",
  pause: "bg-gray-50 text-muted-foreground",
  practice: "bg-primary-50 border-primary-300 border-2",
};

/** A group picker that shows one K–7 group's Sunday timeline at a time. */
export default function SchedulePicker() {
  const { group, select } = useSelectedGroup();

  return (
    <section aria-labelledby="k7-schedule" className="space-y-4">
      <H2 id="k7-schedule" variant="plain" className="text-2xl tracking-tight">
        Groups K–7
      </H2>
      <fieldset className="flex min-w-0 flex-wrap gap-2">
        <legend className="sr-only">Choose a group</legend>
        {GROUPS.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={item.id === group.id ? "default" : "outline"}
            aria-pressed={item.id === group.id}
            onClick={() => select(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </fieldset>
      <H3 className="text-xl">Group {group.label}</H3>
      {group.note && <MutedP>{group.note}</MutedP>}
      <Ol variant="unstyled" className="space-y-2">
        {group.slots.map((item) => (
          <li key={item.time} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4">
            <span className="text-navy-600 pt-2.5 text-sm font-semibold">{item.time}</span>
            <div className={cn("rounded-lg border px-4 py-2.5", SLOT_STYLES[item.kind])}>
              <span className="block font-medium">{item.title}</span>
              {item.where && <span className="block text-sm opacity-80">{item.where}</span>}
            </div>
          </li>
        ))}
      </Ol>
    </section>
  );
}

function useSelectedGroup() {
  const [selectedId, setSelectedId] = useState(DEFAULT_GROUP.id);
  const group = GROUPS.find((item) => item.id === selectedId) ?? DEFAULT_GROUP;

  return { group, select: setSelectedId };
}
