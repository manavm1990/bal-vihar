/*
 * The Impact Award's rules and wording, which only change when the award's rules do.
 *
 * Everything that changes each year (the award year, key dates, coordinator, hours for each
 * level, teaching and community hours, and the download links) is edited in Studio under
 * "Impact Award". Dates left blank there show as "To be announced".
 */
import { type AwardDates, TO_BE_ANNOUNCED } from "@lib/sanity/impact-award";

export interface AwardStep {
  key: string;
  when: string;
  title: string;
  body: string;
  details?: string[];
}

export const AWARD_AGE_GROUP_NOTE =
  "Your age group is the age you are for at least seven of the twelve months in the award year.";

export const TEACHING_REQUIREMENTS = [
  "Be present for the whole class.",
  "Y4 youth independently teach 2–3 classes, and Y5 youth teach 4–5.",
  "Share your lesson plan by the Wednesday before the class.",
  "Tell the teacher at least 24 hours ahead if you must be absent.",
  "Communicate with teachers regularly and promptly.",
];

export const TEACHING_HOURS_HEADERS = [
  "Activity",
  "Classes to lead (Y4)",
  "Classes to lead (Y5)",
  "Prep hours per class taught",
  "Presenting hours per class",
  "Hours per class attended without teaching",
];

export const TEACHING_HOURS_FOOTER =
  "A 30-minute class counts as one class. Teachers may award extra hours at their discretion. For Y1, Y2 and Y3, classroom attendance does not count as volunteer hours.";

export const COMMUNITY_HOURS_HEADERS = [
  "Project",
  "Participating",
  "On the team",
  "Leading the project",
];

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

export const getAwardEligibility = ({ trackingStart, trackingEnd }: AwardDates) => [
  "You are a registered Bal Vihar youth in Y1 through Y5.",
  "You attended at least 75% of your classes.",
  "You volunteered on at least two Bal Vihar service projects, such as Community Projects, Republic Day or CANstruction.",
  trackingStart && trackingEnd
    ? `Your hours were completed between ${trackingStart} and ${trackingEnd} of the award year.`
    : "Your hours were completed during the award year's tracking period, whose dates will be announced.",
  "You apply through one organization only. If you apply through Bal Vihar, you report all your volunteer hours, at Bal Vihar and elsewhere, to Bal Vihar.",
];

export function getAwardSteps(dates: AwardDates): AwardStep[] {
  const by = (date: string | null) => (date ? `By ${date}` : TO_BE_ANNOUNCED);

  return [
    {
      key: "track",
      when: dates.trackingStart ?? TO_BE_ANNOUNCED,
      title: "Start tracking your hours",
      body: "Log every volunteer hour on the tracking sheet as you go. For Bal Vihar events, get the teacher's or coordinator's approval as soon as the volunteering is finished.",
    },
    {
      key: "intent",
      when: by(dates.intent),
      title: "Tell us you plan to apply",
      body: "Email the award coordinator by this date. There are no exceptions for late notice.",
    },
    {
      key: "touchpoint-one",
      when: dates.touchpointOne ?? TO_BE_ANNOUNCED,
      title: "Touchpoint meeting 1 (Zoom)",
      body: "A Zoom meeting that guides applicants through the application process. Applicants must attend both touchpoint meetings.",
    },
    {
      key: "touchpoint-two",
      when: dates.touchpointTwo ?? TO_BE_ANNOUNCED,
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
      when: by(dates.apply),
      title: "Submit your application",
      body: "Upload your tracking log and all proof of service. Nothing is accepted after this date, and there are no exceptions.",
    },
    {
      key: "awards",
      when: dates.awards ?? TO_BE_ANNOUNCED,
      title: "Awards are presented",
      body: "Once every hour has been verified, the award team announces and presents the awards.",
    },
  ];
}

export const getWhatHappensNext = ({ awards }: AwardDates) => [
  "Bal Vihar hours go to the Classroom Teaching, Community Projects or Events/Education Coordinator to confirm. If you and a coordinator disagree on your hours, the coordinator and the Youth Coordinator settle it.",
  "Hours from other organizations are checked at random. The award team calls at least two supervisors.",
  "If someone on the award team is related to you, they step aside and another member reviews your application.",
  awards
    ? `Awards are announced in ${awards}.`
    : "When the awards will be announced is still to be decided.",
];
