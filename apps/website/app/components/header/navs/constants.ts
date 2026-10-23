interface NavigationItem {
  name: string;
  link: string;
  /** Menus near the right edge open leftward so the dropdown stays on screen. */
  align?: "right";
  items: NavigationSubItem[];
}

export interface NavigationSubItem {
  name: string;
  link: string;
  /** Consecutive items sharing a group are rendered together under a heading. */
  group?: string;
}

export const NAVIGATION: readonly NavigationItem[] = [
  {
    name: "About Us",
    link: "/about-us",
    items: [
      { name: "About Bal Vihar", link: "/about-us" },
      { name: "History", link: "/about-us/history" },
      { name: "President's Message", link: "/presidents-message" },
      { name: "Administrative Team", link: "/about-us/administrative-team" },
      { name: "Advisory Board", link: "/about-us/advisory-board" },
      { name: "Policies & Procedures", link: "/about-us/policies-procedures" },
    ],
  },
  {
    name: "Admissions",
    link: "/admissions",
    items: [
      { name: "Admissions Overview", link: "/admissions" },
      { name: "Admissions Policies", link: "/about-us/policies-procedures#admissions" },
    ],
  },
  {
    name: "Education",
    link: "/education",
    items: [
      { name: "Education Overview", link: "/education" },
      { name: "Curriculum (K–7)", link: "/education/curriculum-k-7" },
      { name: "Curriculum – Youth Group", link: "/education/curriculum-youth-group" },
      { name: "Class Schedule", link: "/education/class-schedule" },
      { name: "Class Webpages", link: "/education/class-webpages" },
      { name: "Education Policies", link: "/about-us/policies-procedures#education" },
    ],
  },
  {
    name: "Events & Community",
    link: "/news-and-events",
    items: [
      { name: "News & Events", link: "/news-and-events" },
      { name: "Calendar", link: "/calendar" },
      { name: "Photos", link: "/photos" },
      { name: "Community Projects", link: "/community-projects" },
      { name: "Community Outreach", link: "/about-us/community-outreach" },
    ],
  },
  {
    name: "Get Involved",
    link: "/volunteering",
    align: "right",
    items: [
      { name: "Volunteering Overview", link: "/volunteering", group: "Volunteer" },
      {
        name: "Apply to Volunteer",
        link: "/volunteering/volunteer-application",
        group: "Volunteer",
      },
      { name: "Why Volunteer?", link: "/volunteering/why-volunteer", group: "Volunteer" },
      {
        name: "Volunteer Opportunities",
        link: "/volunteering/volunteer-opportunities",
        group: "Volunteer",
      },
      {
        name: "Volunteer Policies",
        link: "/about-us/policies-procedures#volunteer",
        group: "Volunteer",
      },
      { name: "Giving Overview", link: "/giving", group: "Give" },
      { name: "Welcome Message", link: "/giving/welcome-message", group: "Give" },
      { name: "Give Online", link: "/giving/give-online", group: "Give" },
      { name: "Make a Gift", link: "/giving/make-a-gift", group: "Give" },
      { name: "Matching Gift Program", link: "/giving/matching-gift-program", group: "Give" },
      { name: "Matching Gift Companies", link: "/giving/matching-gift-companies", group: "Give" },
      { name: "Event Sponsors", link: "/giving/event-sponsors", group: "Give" },
    ],
  },
  {
    name: "Contact",
    link: "/questions",
    align: "right",
    items: [
      { name: "Questions & FAQs", link: "/questions" },
      { name: "File a Grievance", link: "/grievance" },
      { name: "Submit an Expense", link: "/expense-reimbursement" },
    ],
  },
];

export function groupItems(items: readonly NavigationSubItem[]) {
  const groups: { heading?: string; items: NavigationSubItem[] }[] = [];

  for (const item of items) {
    const last = groups.at(-1);
    if (last && last.heading === item.group) last.items.push(item);
    else groups.push({ heading: item.group, items: [item] });
  }

  return groups;
}
