import { stegaClean } from "@sanity/client/stega";

import type { VOLUNTEERS_LIST_QUERY_RESULT } from "sanity.types";

export type VolunteerTeam = NonNullable<NonNullable<VOLUNTEERS_LIST_QUERY_RESULT>["teams"]>[number];

/** Keep preview metadata and malformed contact values out of mailto/tel links. */
export function getVolunteerContactLinks(email: string | null, phone: string | null) {
  const cleanEmail = email ? stegaClean(email).trim() : "";
  const cleanPhone = phone ? stegaClean(phone).trim() : "";

  return {
    email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(cleanEmail) ? cleanEmail : null,
    phone: /^\+?[\d ()-]*\d[\d ()-]*$/.test(cleanPhone) ? cleanPhone : null,
  };
}
