interface NavigationItem {
  name: string;
  link: string;
  align?: "right";
  items?: NavigationSubItem[];
}

export interface NavigationSubItem {
  name: string;
  link: string;
  group?: string;
}

export const NAVIGATION: readonly NavigationItem[] = [
  {
    name: "About",
    link: "/about-us",
    items: [
      { name: "About Bal Vihar", link: "/about-us", group: "Who we are" },
      { name: "History", link: "/about-us/history", group: "Who we are" },
      { name: "President's Message", link: "/presidents-message", group: "Who we are" },
      { name: "Administrative Team", link: "/about-us/administrative-team", group: "Who we are" },
      { name: "Community Outreach", link: "/about-us/community-outreach", group: "Community" },
      { name: "Photos", link: "/photos", group: "Community" },
      { name: "Donate", link: "/donate", group: "Community" },
    ],
  },
  {
    name: "Programs",
    link: "/education",
    items: [
      { name: "Programs Overview", link: "/education", group: "Classes" },
      { name: "Curriculum", link: "/education/curriculum", group: "Classes" },
      { name: "Teaching Faculty", link: "/education/teaching-faculty", group: "Classes" },
    ],
  },
  {
    name: "Parents",
    link: "/new-families",
    items: [
      { name: "New Families", link: "/new-families", group: "New families" },
      { name: "Disclaimer Form", link: "/disclaimer", group: "New families" },
      { name: "Calendar", link: "/calendar", group: "Current parents" },
      {
        name: "Class Schedule & Rooms",
        link: "/education/class-schedule",
        group: "Current parents",
      },
      { name: "Class Webpages", link: "/education/class-webpages", group: "Current parents" },
      {
        name: "Policies & Procedures",
        link: "/about-us/policies-procedures",
        group: "Current parents",
      },
      { name: "Concerns & Feedback", link: "/grievance", group: "Current parents" },
    ],
  },
  {
    name: "Teachers",
    link: "/education/curriculum",
    items: [
      { name: "Admin Resources", link: "/admin-resources", group: "Admin" },
      { name: "Print Request", link: "/admin-resources/print-request", group: "Admin" },
      { name: "Submit an Expense", link: "/expense-reimbursement", group: "Admin" },
      { name: "Want to Teach?", link: "/volunteering", group: "Join us" },
    ],
  },
  {
    name: "Volunteer",
    link: "/volunteering",
    align: "right",
    items: [
      { name: "Ways to Help", link: "/volunteering" },
      { name: "Our Volunteers", link: "/volunteering/volunteers" },
      { name: "B-VISION Impact Award", link: "/volunteering/impact-award" },
    ],
  },
  {
    name: "Contact",
    link: "/questions",
    align: "right",
    items: [
      { name: "Contact Us", link: "/questions#contact" },
      { name: "Questions & FAQs", link: "/questions" },
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
