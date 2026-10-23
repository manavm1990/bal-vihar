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

const PARENTS_LOUNGE_NOTE = "Pick-up is from the Parents’ lounge.";

const slot = (time: string, kind: SlotKind, title: string, where?: string): Slot => ({
  time,
  kind,
  title,
  where,
});

// Groups K–3 have class first, then yoga and bhajan in their own area.
const lowerDay = (room: number, place: string, order: readonly [string, string]): Slot[] => [
  slot("10:00 a.m.", "class", "Arathi", `Room #${room}`),
  slot("10:05 a.m.", "class", "Class instruction", `Room #${room}`),
  slot("10:55 a.m.", "pause", "Break"),
  slot("11:05 a.m.", "pause", "Transition to yoga / bhajan"),
  slot("11:15 a.m.", "practice", order[0], place),
  slot("11:45 a.m.", "practice", order[1], place),
  slot("12:20 p.m.", "end", "Dismissal"),
];

// Groups 4–7 do yoga and bhajan first, then class.
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

// TODO: Rooms and times come from the 2022–23 classroom layout and the old orientation booklet.
// Confirm every placement for the current school year, including whether groups have sections.
const DEFAULT_GROUP: Group = {
  id: "K",
  label: "K",
  note: PARENTS_LOUNGE_NOTE,
  slots: lowerDay(5, "Stage Right, Room #6", ["Bhajan", "Yoga"]),
};

const GROUPS: readonly Group[] = [
  DEFAULT_GROUP,
  {
    id: "1",
    label: "1",
    note: PARENTS_LOUNGE_NOTE,
    slots: lowerDay(10, "Stage Left, Room #9", ["Yoga", "Bhajan"]),
  },
  {
    id: "2",
    label: "2",
    slots: lowerDay(11, "Stage Area Center, Room #8", ["Bhajan", "Yoga"]),
  },
  {
    id: "3",
    label: "3",
    slots: lowerDay(4, "Center Hall", ["Yoga", "Bhajan"]),
  },
  {
    id: "4",
    label: "4",
    slots: upperDay(
      "Stage Area Center (Room #8)",
      ["Bhajan", "Stage Area Center (Room #8)"],
      ["Yoga", "Stage Area Center (Room #8)"],
      "Room #10",
    ),
  },
  {
    id: "5",
    label: "5",
    slots: upperDay("Hall Area 1", ["Yoga", "Hall Area 1"], ["Bhajan", "Room #3"], "Room #3"),
  },
  {
    id: "6",
    label: "6",
    slots: upperDay("Hall Area 2", ["Yoga", "Hall Area 2"], ["Bhajan", "Room #2"], "Room #2"),
  },
  {
    id: "7",
    label: "7",
    slots: upperDay(
      "Stage Area Left (Room #9)",
      ["Bhajan", "Stage Area Left (Room #9)"],
      ["Yoga", "Stage Area Left (Room #9)"],
      "Room #11",
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
      <Ol variant="unstyled" className="max-w-3xl space-y-2">
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
