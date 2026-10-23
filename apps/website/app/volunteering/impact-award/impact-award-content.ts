/*
 * Static content for the B-VISION Impact Award page.
 *
 * Almost all of this changes once a year. Search for "TODO(annual)" and update those values each
 * spring; everything else only changes when the award's rules do.
 */

export interface AwardDownload {
  label: string;
  description: string;
  href: string;
}

export interface AwardStep {
  key: string;
  when: string;
  title: string;
  body: string;
  details?: string[];
}

export interface AwardTier {
  name: string;
  tone: "bronze" | "silver" | "gold";
  teens: string;
  youngAdults: string;
}

export interface AwardTable {
  headers: string[];
  rows: string[][];
  footer?: string;
}

// TODO(annual): filler dates. Confirm every one of these for the new award year.
export const AWARD_YEAR = "2026–27";

export const AWARD_DATES = {
  apply: "April 6",
  awards: "May/June",
  intent: "September 30",
  touchpointOne: "Late September",
  touchpointTwo: "Early March",
  trackingEnd: "March 31",
  trackingStart: "April 1",
} as const;

// TODO(annual): confirm who coordinates the award. The mailbox keeps its original name.
export const AWARD_CONTACT = {
  name: "Chidu Subbiah",
  role: "B-VISION Impact Award Coordinator",
  email: "pvsa@balvihar-stlouis.org",
  phone: "636-634-1900",
  phoneHref: "tel:+16366341900",
} as const;

export const AWARD_ELIGIBILITY = [
  "You are a registered Bal Vihar youth in Y1 through Y5.",
  "You attended at least 75% of your classes.",
  "You volunteered on at least two Bal Vihar service projects, such as Community Projects, Republic Day or CANstruction.",
  `Your hours were completed between ${AWARD_DATES.trackingStart} and ${AWARD_DATES.trackingEnd} of the award year.`,
  "You apply through one organization only. If you apply through Bal Vihar, you report all your volunteer hours, at Bal Vihar and elsewhere, to Bal Vihar.",
];

export const AWARD_STEPS: AwardStep[] = [
  {
    key: "track",
    when: AWARD_DATES.trackingStart,
    title: "Start tracking your hours",
    body: "Log every volunteer hour on the tracking sheet as you go. For Bal Vihar events, get the teacher's or coordinator's approval as soon as the volunteering is finished.",
  },
  {
    key: "intent",
    when: `By ${AWARD_DATES.intent}`,
    title: "Tell us you plan to apply",
    body: "Email the award coordinator by this date. There are no exceptions for late notice.",
  },
  {
    key: "touchpoint-one",
    when: AWARD_DATES.touchpointOne,
    title: "Touchpoint meeting 1 (Zoom)",
    body: "A Zoom meeting that guides applicants through the application process. Applicants must attend both touchpoint meetings.",
  },
  {
    key: "touchpoint-two",
    when: AWARD_DATES.touchpointTwo,
    title: "Touchpoint meeting 2 (Zoom)",
    body: "A second Zoom meeting to guide applicants through the application process.",
  },
  {
    key: "sign-off",
    when: "Before you apply",
    title: "Get your hours signed off",
    body: "Every hour on your tracking sheet needs proof that someone else can check.",
    details: [
      "Bal Vihar hours: email the person who assigned them and save the reply as a PDF. For classroom teaching, ask your classroom teacher or the Classroom Teaching Coordinator. For community projects, ask the Community Projects Coordinator. For main events such as Republic Day, ask the Events/Education Coordinators.",
      "Hours elsewhere: get a signed certificate, or an official email or letter, from the organization. Include your supervisor's name, email and phone number, and let the organization know we may contact them to verify your hours.",
    ],
  },
  {
    key: "apply",
    when: `By ${AWARD_DATES.apply}`,
    title: "Submit your application",
    body: "Upload your tracking log and all proof of service. Nothing is accepted after this date, and there are no exceptions.",
  },
  {
    key: "awards",
    when: AWARD_DATES.awards,
    title: "Awards are presented",
    body: "Once every hour has been verified, the award team announces and presents the awards.",
  },
];

// TODO(annual): the levels and age groups come from the 2025–26 slides. Confirm they still apply.
export const AWARD_TIERS: AwardTier[] = [
  { name: "Bronze", tone: "bronze", teens: "50–74", youngAdults: "100–174" },
  { name: "Silver", tone: "silver", teens: "75–99", youngAdults: "175–249" },
  { name: "Gold", tone: "gold", teens: "100+", youngAdults: "250+" },
];

export const AWARD_AGE_GROUP_NOTE =
  "Your age group is the age you are for at least seven of the twelve months in the award year.";

export const TEACHING_REQUIREMENTS = [
  "Be present for the whole class.",
  "Y4 youth independently teach 2–3 classes, and Y5 youth teach 4–5.",
  "Share your lesson plan by the Wednesday before the class.",
  "Tell the teacher at least 24 hours ahead if you must be absent.",
  "Communicate with teachers regularly and promptly.",
];

// TODO(annual): the 2025–26 Guidelines say Bhajan, Yoga and Art youth lead "at least 4–5" (Y4) and
// "8–10" (Y5) classes, but their hours table says 5 and 8. Confirm which is right.
export const TEACHING_HOURS_TABLE: AwardTable = {
  headers: [
    "Activity",
    "Classes to lead (Y4)",
    "Classes to lead (Y5)",
    "Prep hours per class taught",
    "Presenting hours per class",
    "Hours per class attended without teaching",
  ],
  rows: [
    ["Classroom teaching", "At least 2–3", "At least 4–5", "2", "1.5", "1"],
    ["Bhajan (30 minutes)", "5", "8", "0.75", "1", "0.5"],
    ["Yoga (30 minutes)", "5", "8", "0.75", "1", "0.5"],
    ["Art", "5", "8", "0.75", "1", "0.5"],
  ],
  footer:
    "A 30-minute class counts as one class. Teachers may award extra hours at their discretion. For Y1, Y2 and Y3, classroom attendance does not count as volunteer hours.",
};

// TODO(annual): the projects change every year. Replace these rows with this year's projects.
export const COMMUNITY_HOURS_INTRO =
  "The Community Projects Coordinator awards these hours based on each youth's performance and participation. They include the extra time leaders and team members spend on flyers, emails to the team and driving. The projects change every year, so these are examples.";

export const COMMUNITY_HOURS_TABLE: AwardTable = {
  headers: ["Project", "Participating", "On the team", "Leading the project"],
  rows: [
    ["CANstruction", "8", "20", "25"],
    ["School supply drive", "1", "2", "3"],
    ["Coat drive", "2", "3", "3"],
    ["Sandwich making", "3", "3", "5"],
    ["Kare Kitchen (casserole making)", "5", "5", "7"],
    ["Class attendance", "1", "—", "—"],
  ],
};

export const EVENT_HOURS_TEXT =
  "The Events/Education Coordinators confirm hours for Bal Vihar events and logistics, such as Republic Day. Ask for their approval as soon as the event is over.";

export const OUTSIDE_HOURS_TEXT =
  "Service with other organizations counts too, as long as you can prove it. Get a signed certificate, or an official email or letter, from your supervisor that includes their name, email and phone number. The award team checks hours at random, so expect that we may call your supervisor.";

export const VOLUNTEER_IDEAS = [
  "Take part in service opportunities offered by Bal Vihar",
  "Be a student teacher at Bal Vihar",
  "Serve meals at a local shelter or community kitchen",
  "Tutor or mentor in an after-school program",
  "Host a resume-writing or resume-review workshop",
  "Conduct practice interviews",
  "Organize a food drive (ask local food pantries which items they need first)",
  "Work with local, state or national park services to beautify parks",
  "Serve at a community garden",
  "Make and distribute disaster-preparedness kits",
  "Collect and share information about free tax-prep services",
  "Read to students or seniors at a community or senior center",
  "Volunteer at an animal shelter",
];

export const WHAT_HAPPENS_NEXT = [
  "Bal Vihar hours go to the Classroom Teaching, Community Projects or Events/Education Coordinator to confirm. If you and a coordinator disagree on your hours, the coordinator and the Youth Coordinator settle it.",
  "Hours from other organizations are checked at random. The award team calls at least two supervisors.",
  "If someone on the award team is related to you, they step aside and another member reviews your application.",
  `Awards are announced in ${AWARD_DATES.awards}.`,
];

// TODO(annual): confirm what the second proof sample is.
export const AWARD_DOWNLOADS: AwardDownload[] = [
  {
    label: "Tracking sheet",
    description: "Log every hour here as you volunteer. Print it or fill it in on screen.",
    href: "https://docs.google.com/spreadsheets/d/1Z7_CjWQNsBynD2bwP2TplbfAGVt6MU98/edit?usp=sharing&ouid=112480514389048193924&rtpof=true&sd=true",
  },
  {
    label: "Proof of service template",
    description: "A template for documenting your hours with an outside organization.",
    href: "https://docs.google.com/document/d/14Mu4JAv1hqRxRoWvGColNol63cyXHZQKYRML-4xv0Gc/edit?usp=sharing",
  },
  {
    label: "Proof of service sample",
    description: "A second sample of documented proof.",
    href: "https://docs.google.com/document/d/1GRzVlwKcbfVNpZVtnK8Jsp5js0P1aBMzF-XYRxmGA9I/edit?usp=sharing",
  },
];
