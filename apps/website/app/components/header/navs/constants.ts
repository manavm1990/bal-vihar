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
  { name: "About", link: "/about-us" },
  { name: "Programs", link: "/education" },
  { name: "Parents", link: "/new-families" },
  { name: "Teachers", link: "/volunteering" },
  { name: "Volunteer", link: "/volunteering" },
  { name: "Contact", link: "/questions" },
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
