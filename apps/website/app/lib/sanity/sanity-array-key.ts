export const getSanityArrayKey = (item: Record<string, unknown>, fallback: string) => {
  const raw = item["_key"];
  return typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : fallback;
};
