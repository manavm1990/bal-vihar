import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BASE_TITLE, FOUNDING_YEAR, ORGANIZATION_LEGAL_NAME } from "@lib/constants";
import { ImageResponse } from "next/og";

export const alt = `${BASE_TITLE} – ${ORGANIZATION_LEGAL_NAME}`;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const COLORS = {
  saffron: "#FF9933",
  navy: "#000080",
  gray: "#4B5563",
} as const;

const logo = await readFile(join(process.cwd(), "public", "logo.svg"), "base64");
const logoSrc = `data:image/svg+xml;base64,${logo}`;

export default async function Image() {
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
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
        }}
      >
        <img src={logoSrc} alt="" width={312} height={300} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, color: COLORS.navy }}>
            {BASE_TITLE}
          </div>
          <div style={{ fontSize: 32, color: COLORS.gray }}>{ORGANIZATION_LEGAL_NAME}</div>
          <div style={{ fontSize: 32, color: COLORS.gray }}>
            {`Teaching Indian culture and values to children since ${FOUNDING_YEAR}`}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
