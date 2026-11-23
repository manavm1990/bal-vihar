import { defineArrayMember, defineField, type UrlRule, type ValidationContext } from "sanity";
import { API_VERSION } from "../constants";
import { describeMissingSlash, getFirstSegment, parseSitePath } from "../field-rules";
import { RESERVED_SLUGS } from "../route-config";

const LINK_SCHEMES = ["http", "https", "mailto", "tel"];
const PUBLIC_FOLDERS = ["documents"];

export const createLinkRules = (rule: UrlRule) => [
  rule.uri({ allowRelative: true, scheme: LINK_SCHEMES }),
  rule.custom((href) => describeMissingSlash(href) ?? true),
  rule.custom(checkSitePage).warning(),
];

export const LINK_ANNOTATION = defineArrayMember({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      description: "Use /about-us/history for pages on this site, or a full https:// link.",
      validation: (rule) => [rule.required(), ...createLinkRules(rule)],
    }),
  ],
});

async function checkSitePage(href: string | undefined, context: ValidationContext) {
  const path = parseSitePath(href);
  if (!path) return true;
  if (!href?.startsWith("/"))
    return `Use ${path} instead of the full address, so the link also works in Preview.`;

  const segment = getFirstSegment(path);
  if (segment === "" || isKnownRoute(segment)) return true;

  const pages = await context
    .getClient({ apiVersion: API_VERSION })
    .fetch<number>(`count(*[_type == "page" && slug.current == $slug])`, { slug: segment });

  return pages > 0
    ? true
    : `Nothing on this site lives at /${segment}. Check the spelling, or copy the address from the page itself.`;
}

const isKnownRoute = (segment: string) =>
  PUBLIC_FOLDERS.includes(segment) || RESERVED_SLUGS.some((route) => route === segment);
