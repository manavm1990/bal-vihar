/** A WhatsApp link that opens the chat picker with the message already written. */
export const createWhatsAppShareUrl = (lines: readonly (string | null | undefined)[]) =>
  `https://wa.me/?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
