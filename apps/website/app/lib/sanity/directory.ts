import { stegaClean } from "@sanity/client/stega";

export interface DirectoryPerson {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface DirectoryEntry extends DirectoryPerson {
  roles: string[];
}

export const cleanText = (value: string | null | undefined) =>
  value ? stegaClean(value).trim() : "";

export const compareNames = (a: string, b: string) =>
  getLastName(a).localeCompare(getLastName(b)) || a.localeCompare(b);

export const sortDirectory = (entries: DirectoryEntry[]) =>
  [...entries].sort((a, b) => compareNames(a.name, b.name));

const getLastName = (name: string) => name.split(" ").at(-1)?.toLowerCase() ?? "";
