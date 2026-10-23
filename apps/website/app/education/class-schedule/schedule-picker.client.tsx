"use client";

import { Button } from "@components/ui/button";
import { H2, H3, MutedP, Ol } from "@components/ui/typography";
import { FADE } from "@lib/animations";
import { cn } from "@lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import FloorPlan, { type RoomId, type RoomLabels, type RoomNumber } from "./floor-plan";

type SlotKind = "class" | "end" | "pause" | "practice";

interface Spot {
  room: RoomId;
  where: string;
}

interface Slot {
  time: string;
  kind: SlotKind;
  title: string;
  spot?: Spot | undefined;
}

interface Group {
  id: string;
  label: string;
  note?: string;
  slots: readonly Slot[];
}

const PARENTS_LOUNGE_NOTE = "Pick-up is from the Parents’ lounge.";

const slot = (time: string, kind: SlotKind, title: string, spot?: Spot): Slot => ({
  time,
  kind,
  title,
  spot,
});

const classroom = (number: RoomNumber): Spot => ({
  room: `room-${number}`,
  where: `Room #${number}`,
});

// Groups K–3 have class first, then yoga and bhajan in their own area.
const lowerDay = (
  classSpot: Spot,
  practiceSpot: Spot,
  order: readonly [string, string],
): Slot[] => [
  slot("10:00 a.m.", "class", "Arathi", classSpot),
  slot("10:05 a.m.", "class", "Class instruction", classSpot),
  slot("10:55 a.m.", "pause", "Break"),
  slot("11:05 a.m.", "pause", "Transition to yoga / bhajan"),
  slot("11:15 a.m.", "practice", order[0], practiceSpot),
  slot("11:45 a.m.", "practice", order[1], practiceSpot),
  slot("12:20 p.m.", "end", "Dismissal"),
];

// Groups 4–7 do yoga and bhajan first, then class.
const upperDay = (
  assembly: Spot,
  first: readonly [string, Spot],
  second: readonly [string, Spot],
  classSpot: Spot,
): Slot[] => [
  slot("10:00 a.m.", "class", "Assembly", assembly),
  slot("10:05 a.m.", "practice", first[0], first[1]),
  slot("10:35 a.m.", "practice", second[0], second[1]),
  slot("11:05 a.m.", "pause", "Transition to class"),
  slot("11:10 a.m.", "pause", "Break"),
  slot("11:20 a.m.", "class", "Class instruction", classSpot),
  slot("12:30 p.m.", "end", "Dismissal"),
];

const HALL_1: Spot = { room: "hall-1", where: "Hall Area 1" };
const HALL_2: Spot = { room: "hall-2", where: "Hall Area 2" };
const STAGE: Spot = { room: "room-8", where: "Stage Area Center (Room #8)" };
const STAGE_LEFT: Spot = { room: "room-9", where: "Stage Area Left (Room #9)" };

// TODO: Rooms and times come from the 2022–23 classroom layout and the old orientation booklet.
// Confirm every placement for the current school year, including whether groups have sections,
// and whether Group 3's "Center Hall" is Hall Area 1.
const DEFAULT_GROUP: Group = {
  id: "K",
  label: "K",
  note: PARENTS_LOUNGE_NOTE,
  slots: lowerDay(classroom(5), { room: "room-6", where: "Stage Right, Room #6" }, [
    "Bhajan",
    "Yoga",
  ]),
};

const GROUPS: readonly Group[] = [
  DEFAULT_GROUP,
  {
    id: "1",
    label: "1",
    note: PARENTS_LOUNGE_NOTE,
    slots: lowerDay(classroom(10), { room: "room-9", where: "Stage Left, Room #9" }, [
      "Yoga",
      "Bhajan",
    ]),
  },
  {
    id: "2",
    label: "2",
    slots: lowerDay(classroom(11), { room: "room-8", where: "Stage Area Center, Room #8" }, [
      "Bhajan",
      "Yoga",
    ]),
  },
  {
    id: "3",
    label: "3",
    slots: lowerDay(classroom(4), HALL_1, ["Yoga", "Bhajan"]),
  },
  {
    id: "4",
    label: "4",
    slots: upperDay(STAGE, ["Bhajan", STAGE], ["Yoga", STAGE], classroom(10)),
  },
  {
    id: "5",
    label: "5",
    slots: upperDay(HALL_1, ["Yoga", HALL_1], ["Bhajan", classroom(3)], classroom(3)),
  },
  {
    id: "6",
    label: "6",
    slots: upperDay(HALL_2, ["Yoga", HALL_2], ["Bhajan", classroom(2)], classroom(2)),
  },
  {
    id: "7",
    label: "7",
    slots: upperDay(STAGE_LEFT, ["Bhajan", STAGE_LEFT], ["Yoga", STAGE_LEFT], classroom(11)),
  },
];

const SLOT_STYLES: Record<SlotKind, string> = {
  class: "bg-background",
  end: "bg-secondary text-secondary-foreground border-secondary",
  pause: "bg-gray-50 text-muted-foreground",
  practice: "bg-primary-50 border-primary-300 border-2",
};

/** A group picker that shows one K–7 group's Sunday timeline and rooms at a time. */
export default function SchedulePicker() {
  const { group, select, fadeIn } = useSelectedGroup();

  return (
    <section aria-labelledby="k7-schedule" className="space-y-4">
      <H2 id="k7-schedule" variant="plain" className="text-2xl tracking-tight">
        Groups K–7
      </H2>
      <fieldset className="min-w-0 space-y-2">
        <legend className="mb-2 font-medium">Tap your child’s group</legend>
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant={item.id === group.id ? "default" : "outline"}
              aria-pressed={item.id === group.id}
              className="h-12 min-w-12"
              onClick={() => select(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <MutedP>
          Not sure which group your child is in? <Link href="/questions">Ask us</Link>.
        </MutedP>
      </fieldset>
      <motion.div key={group.id} className="space-y-4" {...fadeIn}>
        <H3 className="text-xl">Group {group.label}</H3>
        {group.note && <MutedP>{group.note}</MutedP>}
        <Ol variant="unstyled" className="max-w-3xl space-y-2">
          {group.slots.map((item) => (
            <li key={item.time} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4">
              <span className="text-navy-600 pt-2.5 text-sm font-semibold">{item.time}</span>
              <div className={cn("rounded-lg border px-4 py-2.5", SLOT_STYLES[item.kind])}>
                <span className="block font-medium">{item.title}</span>
                {item.spot && <span className="block text-sm opacity-80">{item.spot.where}</span>}
              </div>
            </li>
          ))}
        </Ol>
      </motion.div>
      <H3 id="where-to-go" className="scroll-mt-6 pt-4 text-xl">
        Where to go
      </H3>
      <FloorPlan groupLabel={group.label} labels={getRoomLabels(group.slots)} />
    </section>
  );
}

function getRoomLabels(slots: readonly Slot[]) {
  const labels: Record<string, string[]> = {};

  for (const item of slots) {
    if (!item.spot) continue;

    const label = item.kind === "class" && item.title !== "Assembly" ? "Class" : item.title;
    const current = labels[item.spot.room] ?? [];
    if (!current.includes(label)) labels[item.spot.room] = [...current, label];
  }

  return labels satisfies RoomLabels;
}

function useSelectedGroup() {
  const [selectedId, setSelectedId] = useState(DEFAULT_GROUP.id);
  const group = GROUPS.find((item) => item.id === selectedId) ?? DEFAULT_GROUP;
  const [hasPicked, setHasPicked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Fade only after a tap, so the first paint is never hidden while the page hydrates.
  const fadeIn =
    shouldReduceMotion || !hasPicked
      ? {}
      : { initial: FADE.initial, animate: FADE.animate, transition: FADE.transition };

  const select = (id: string) => {
    setSelectedId(id);
    setHasPicked(true);
  };

  return { group, select, fadeIn };
}
