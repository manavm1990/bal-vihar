import { cn } from "@lib/utils";

export type RoomNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type RoomId = `room-${RoomNumber}` | "hall-1" | "hall-2";

/** What a group does in each room, for example `{ "room-5": ["Class"] }`. */
export type RoomLabels = Partial<Record<RoomId, readonly string[]>>;

interface Area {
  id?: RoomId;
  name: string;
  note?: string;
}

// TODO: Matches the 2022–23 classroom layout; confirm the building has not changed.
const LEFT_COLUMN: readonly Area[] = [
  { id: "room-6", name: "Room 6" },
  { id: "room-5", name: "Room 5" },
  { id: "room-4", name: "Room 4" },
  { id: "room-3", name: "Room 3" },
  { id: "room-2", name: "Room 2" },
  { id: "room-1", name: "Room 1", note: "Y3" },
];

const RIGHT_COLUMN: readonly Area[] = [
  { id: "room-9", name: "Room 9" },
  { name: "Teachers’ lounge" },
  { id: "room-10", name: "Room 10" },
  { id: "room-11", name: "Room 11" },
  { id: "room-12", name: "Room 12", note: "Y2" },
  { id: "room-13", name: "Room 13", note: "Y1" },
];

const BOTTOM_ROW: readonly Area[] = [
  { name: "Library" },
  { name: "Y4 community service" },
  { name: "Parents’ lounge" },
];

const NAMED_AREAS: readonly Area[] = [
  ...LEFT_COLUMN,
  ...RIGHT_COLUMN,
  { id: "room-8", name: "Room 8 (stage)" },
  { id: "hall-1", name: "Hall area 1" },
  { id: "hall-2", name: "Hall area 2" },
];

interface FloorPlanProps {
  groupLabel: string;
  labels: RoomLabels;
}

/** A schematic of the classrooms, with the rooms a group uses highlighted and labeled. */
export default function FloorPlan({ groupLabel, labels }: FloorPlanProps) {
  return (
    <figure className="max-w-3xl space-y-3">
      <figcaption className="font-medium">{describe(groupLabel, labels)}</figcaption>
      <div aria-hidden="true" className="grid grid-cols-[1fr_2fr_1fr] gap-x-2 sm:gap-x-6">
        <Column areas={LEFT_COLUMN} labels={labels} />
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <Tile area={{ id: "room-8", name: "Stage area, Room 8" }} labels={labels} />
            <Tile area={{ id: "hall-1", name: "Hall area 1" }} labels={labels} />
            <Tile area={{ id: "hall-2", name: "Hall area 2" }} labels={labels} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {BOTTOM_ROW.map((area) => (
              <Tile key={area.name} area={area} labels={labels} />
            ))}
          </div>
        </div>
        <Column areas={RIGHT_COLUMN} labels={labels} />
      </div>
    </figure>
  );
}

interface ColumnProps {
  areas: readonly Area[];
  labels: RoomLabels;
}

function Column({ areas, labels }: ColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      {areas.map((area) => (
        <Tile key={area.name} area={area} labels={labels} />
      ))}
    </div>
  );
}

interface TileProps {
  area: Area;
  labels: RoomLabels;
}

function Tile({ area, labels }: TileProps) {
  const roomLabels = area.id ? labels[area.id] : undefined;
  const isActive = Boolean(roomLabels?.length);

  return (
    <div
      className={cn(
        "flex min-h-14 flex-col items-center justify-center rounded-md border px-1 py-1.5 text-center text-xs motion-safe:transition-colors motion-safe:duration-300 sm:text-sm",
        isActive
          ? "bg-primary text-primary-foreground border-primary font-semibold"
          : "text-muted-foreground bg-gray-50",
      )}
    >
      <span>{area.name}</span>
      {area.note && <span className="text-xs font-normal">{area.note}</span>}
      {isActive && <span className="text-xs font-normal">{roomLabels?.join(", ")}</span>}
    </div>
  );
}

function describe(groupLabel: string, labels: RoomLabels) {
  const parts = NAMED_AREAS.flatMap((area) => {
    const roomLabels = area.id ? labels[area.id] : undefined;
    return roomLabels?.length ? [`${area.name} (${roomLabels.join(", ")})`] : [];
  });

  return `Group ${groupLabel} goes to the highlighted rooms: ${parts.join(", ")}.`;
}
