interface NavigationItem {
  name: string;
  link: string;
  /** Menus near the right edge open leftward so the dropdown stays on screen. */
  align?: "right";
  /** Entries without sub-items render as a plain link instead of a dropdown. */
  items?: NavigationSubItem[];
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
      { name: "Policies & Procedures", link: "/about-us/policies-procedures" },
    ],
  },
  {
    name: "Admissions",
    link: "/admissions",
  },
  {
    name: "Education",
    link: "/education",
    items: [
      { name: "Education Overview", link: "/education" },
      { name: "Curriculum", link: "/education/curriculum" },
      { name: "Class Schedule & Rooms", link: "/education/class-schedule" },
      { name: "Teaching Faculty", link: "/education/teaching-faculty" },
      { name: "Class Webpages", link: "/education/class-webpages" },
      { name: "New Families", link: "/new-families" },
    ],
  },
  {
    name: "Events & Community",
    link: "/calendar",
    items: [
      { name: "Calendar", link: "/calendar" },
      { name: "Photos", link: "/photos" },
      { name: "Community Outreach", link: "/about-us/community-outreach" },
    ],
  },
  {
    name: "Get Involved",
    link: "/volunteering",
    align: "right",
    items: [
      { name: "Volunteering", link: "/volunteering" },
      { name: "Our Volunteers", link: "/volunteering/volunteers" },
      { name: "B-VISION Impact Award", link: "/volunteering/impact-award" },
      { name: "Giving", link: "/giving" },
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
