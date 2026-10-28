export const createWhatsAppShareUrl = (lines: readonly (string | null | undefined)[]) =>
  `https://wa.me/?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
