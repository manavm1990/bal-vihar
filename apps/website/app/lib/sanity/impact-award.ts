import { stegaClean } from "@sanity/client/stega";
import { fetchSanityOrNull } from "./fetch";
import { IMPACT_AWARD_QUERY } from "./queries";
import { getVolunteerContactLinks } from "./volunteers-list";

export const TO_BE_ANNOUNCED = "To be announced";

export interface AwardContact {
  name: string;
  role: string | null;
  email: string | null;
  phone: string | null;
  phoneHref: string | null;
}

export interface AwardDates {
  trackingStart: string | null;
  trackingEnd: string | null;
  intent: string | null;
  touchpointOne: string | null;
  touchpointTwo: string | null;
  apply: string | null;
  awards: string | null;
}

export interface AwardDownload {
  label: string;
  description: string | null;
  href: string;
}

export interface AwardTier {
  name: string;
  tone: "bronze" | "silver" | "gold";
  teens: string;
  youngAdults: string;
}

export interface ImpactAwardView {
  year: string | null;
  dates: AwardDates;
  contact: AwardContact | null;
  tiers: AwardTier[];
  teachingHours: string[][];
  communityIntro: string | null;
  communityProjects: string[][];
  downloads: AwardDownload[];
}

type Text = string | null | undefined;

interface ImpactAwardData {
  awardYear?: Text;
  dates?: Partial<Record<keyof AwardDates, Text>> | null;
  coordinator?: { name?: Text; role?: Text; email?: Text; phone?: Text } | null;
  tiers?: Partial<
    Record<"bronze" | "silver" | "gold", { teens?: Text; youngAdults?: Text } | null>
  > | null;
  teachingHours?:
    | readonly {
        activity?: Text;
        classesY4?: Text;
        classesY5?: Text;
        prepHours?: Text;
        presentingHours?: Text;
        attendedHours?: Text;
      }[]
    | null;
  communityIntro?: Text;
  communityProjects?:
    | readonly { project?: Text; participating?: Text; onTheTeam?: Text; leading?: Text }[]
    | null;
  downloads?: readonly { label?: Text; description?: Text; url?: Text }[] | null;
}

const TIER_LEVELS = [
  { key: "bronze", name: "Bronze" },
  { key: "silver", name: "Silver" },
  { key: "gold", name: "Gold" },
] as const;

export async function fetchImpactAward(): Promise<ImpactAwardView> {
  const result = await fetchSanityOrNull(IMPACT_AWARD_QUERY, "the Impact Award");

  return getImpactAward(result?.data);
}

export const getImpactAward = (data: ImpactAwardData | null | undefined): ImpactAwardView => ({
  year: clean(data?.awardYear),
  dates: {
    trackingStart: clean(data?.dates?.trackingStart),
    trackingEnd: clean(data?.dates?.trackingEnd),
    intent: clean(data?.dates?.intent),
    touchpointOne: clean(data?.dates?.touchpointOne),
    touchpointTwo: clean(data?.dates?.touchpointTwo),
    apply: clean(data?.dates?.apply),
    awards: clean(data?.dates?.awards),
  },
  contact: getContact(data?.coordinator),
  tiers: getTiers(data?.tiers),
  teachingHours: (data?.teachingHours ?? []).map((row) =>
    [
      row.activity,
      row.classesY4,
      row.classesY5,
      row.prepHours,
      row.presentingHours,
      row.attendedHours,
    ].map((cell) => clean(cell) ?? ""),
  ),
  communityIntro: clean(data?.communityIntro),
  communityProjects: (data?.communityProjects ?? []).map((row) =>
    [row.project, row.participating, row.onTheTeam, row.leading].map((cell) => clean(cell) ?? ""),
  ),
  downloads: getDownloads(data?.downloads),
});

const clean = (value: Text) => stegaClean(value ?? "").trim() || null;

function getContact(coordinator: ImpactAwardData["coordinator"]): AwardContact | null {
  const name = clean(coordinator?.name);
  if (!name) return null;

  const { email, phone } = getVolunteerContactLinks(
    clean(coordinator?.email),
    clean(coordinator?.phone),
  );
  const digits = phone?.replace(/[ ()-]/g, "") ?? "";

  return {
    name,
    role: clean(coordinator?.role),
    email,
    phone,
    phoneHref: digits ? `tel:${/^\d{10}$/.test(digits) ? `+1${digits}` : digits}` : null,
  };
}

function getDownloads(downloads: ImpactAwardData["downloads"]): AwardDownload[] {
  return (downloads ?? []).flatMap((item) => {
    const label = clean(item.label);
    const href = clean(item.url);

    return label && href && /^https?:\/\//.test(href)
      ? [{ label, description: clean(item.description), href }]
      : [];
  });
}

function getTiers(tiers: ImpactAwardData["tiers"]): AwardTier[] {
  return TIER_LEVELS.flatMap(({ key, name }) => {
    const teens = clean(tiers?.[key]?.teens);
    const youngAdults = clean(tiers?.[key]?.youngAdults);

    return teens && youngAdults ? [{ name, tone: key, teens, youngAdults }] : [];
  });
}
