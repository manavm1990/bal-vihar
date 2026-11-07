import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BASE_TITLE, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import { fetchCalendarEvent } from "@lib/sanity/calendar-event";
import { formatCalendarEventMeta } from "@lib/sanity/map-calendar-events";
import { ImageResponse } from "next/og";
import DefaultImage, { size } from "../../opengraph-image";

export { contentType, size } from "../../opengraph-image";

export const alt = `${BASE_TITLE} calendar event`;

const COLORS = {
  saffron: "#FF9933",
  navy: "#000080",
  gray: "#4B5563",
} as const;

const LONG_TITLE_LENGTH = 40;

const logo = await readFile(join(process.cwd(), "public", "logo.svg"), "base64");
const logoSrc = `data:image/svg+xml;base64,${logo}`;

interface ImageProps {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: ImageProps) {
  const event = await fetchCalendarEvent((await params).id, { stega: false });
  if (!event) return DefaultImage();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ height: 24, backgroundColor: COLORS.saffron }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: event.title.length > LONG_TITLE_LENGTH ? 64 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            color: COLORS.navy,
          }}
        >
          {event.title}
        </div>
        <div style={{ fontSize: 38, color: COLORS.gray }}>{formatCalendarEventMeta(event)}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "0 80px 48px",
        }}
      >
        <img src={logoSrc} alt="" width={78} height={75} />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 28, color: COLORS.gray }}>
          <div style={{ fontWeight: 700, color: COLORS.navy }}>{BASE_TITLE}</div>
          <div>{ORGANIZATION_LEGAL_NAME}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
