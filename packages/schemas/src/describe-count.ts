/** Studio preview subtitle such as "3 teachers", or "No teachers yet" for an empty list. */
export function describeCount(items: unknown, singular: string, plural: string) {
  const count = Array.isArray(items) ? items.length : 0;

  return count === 0 ? `No ${plural} yet` : `${count} ${count === 1 ? singular : plural}`;
}
