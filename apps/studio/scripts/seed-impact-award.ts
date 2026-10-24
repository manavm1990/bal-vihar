/**
 * One-off: loads the Impact Award details that used to live in the website code into the
 * `impactAward` document. The award year and the key dates are left blank on purpose, because
 * they were filler. The committee fills them in Studio once they are confirmed, and until then
 * the page says "To be announced".
 *
 * Run from apps/studio, signed in with `bunx sanity login`:
 *   bunx sanity exec scripts/seed-impact-award.ts --with-user-token
 *
 * It uses createIfNotExists, so running it again never overwrites edits made in Studio.
 */
import { getCliClient } from "sanity/cli";

const TEACHING_HOURS = [
  ["Classroom teaching", "At least 2–3", "At least 4–5", "2", "1.5", "1"],
  ["Bhajan (30 minutes)", "5", "8", "0.75", "1", "0.5"],
  ["Yoga (30 minutes)", "5", "8", "0.75", "1", "0.5"],
  ["Art", "5", "8", "0.75", "1", "0.5"],
] as const;

const COMMUNITY_PROJECTS = [
  ["CANstruction", "8", "20", "25"],
  ["School supply drive", "1", "2", "3"],
  ["Coat drive", "2", "3", "3"],
  ["Sandwich making", "3", "3", "5"],
  ["Kare Kitchen (casserole making)", "5", "5", "7"],
  ["Class attendance", "1", "—", "—"],
] as const;

const DOWNLOADS = [
  {
    label: "Tracking sheet",
    description: "Log every hour here as you volunteer. Print it or fill it in on screen.",
    url: "https://docs.google.com/spreadsheets/d/1Z7_CjWQNsBynD2bwP2TplbfAGVt6MU98/edit?usp=sharing&ouid=112480514389048193924&rtpof=true&sd=true",
  },
  {
    label: "Proof of service template",
    description: "A template for documenting your hours with an outside organization.",
    url: "https://docs.google.com/document/d/14Mu4JAv1hqRxRoWvGColNol63cyXHZQKYRML-4xv0Gc/edit?usp=sharing",
  },
  {
    label: "Proof of service sample",
    description: "A second sample of documented proof.",
    url: "https://docs.google.com/document/d/1GRzVlwKcbfVNpZVtnK8Jsp5js0P1aBMzF-XYRxmGA9I/edit?usp=sharing",
  },
] as const;

async function seedImpactAward() {
  const client = getCliClient({ apiVersion: "2025-01-01" });

  await client.createIfNotExists({
    _id: "impactAward",
    _type: "impactAward",
    title: "Impact Award",
    coordinator: {
      name: "Chidu Subbiah",
      role: "B-VISION Impact Award Coordinator",
      email: "pvsa@balvihar-stlouis.org",
      phone: "636-634-1900",
    },
    tiers: {
      bronze: { teens: "50–74", youngAdults: "100–174" },
      silver: { teens: "75–99", youngAdults: "175–249" },
      gold: { teens: "100+", youngAdults: "250+" },
    },
    teachingHours: TEACHING_HOURS.map(
      ([activity, classesY4, classesY5, prepHours, presentingHours, attendedHours], index) => ({
        _type: "teachingHoursRow",
        _key: `teaching-${index + 1}`,
        activity,
        classesY4,
        classesY5,
        prepHours,
        presentingHours,
        attendedHours,
      }),
    ),
    communityIntro:
      "The Community Projects Coordinator awards these hours based on each youth's performance and participation. They include the extra time leaders and team members spend on flyers, emails to the team and driving. The projects change every year, so these are examples.",
    communityProjects: COMMUNITY_PROJECTS.map(
      ([project, participating, onTheTeam, leading], index) => ({
        _type: "communityProjectRow",
        _key: `project-${index + 1}`,
        project,
        participating,
        onTheTeam,
        leading,
      }),
    ),
    downloads: DOWNLOADS.map((download, index) => ({
      _type: "awardDownload",
      _key: `download-${index + 1}`,
      ...download,
    })),
  });
  console.log('Seeded the Impact Award (nothing changes if "impactAward" already exists).');
}

seedImpactAward().catch((error: unknown) => {
  console.error("Could not seed the Impact Award", error);
  process.exit(1);
});
