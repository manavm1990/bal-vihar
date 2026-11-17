import { buildTheme } from "@sanity/themer";

export const BRAND = {
  cream: "#fff6eb",
  navy: "#2a3a6d",
  navyDark: "#1b254c",
  saffron: "#ff9934",
  saffronInk: "#974d00",
} as const;

export const theme = buildTheme({
  light: { accent: BRAND.navy, background: "#ffffff" },
  dark: { accent: BRAND.saffron, background: BRAND.navyDark },
});
