import { stegaClean } from "@sanity/client/stega";
import type { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import type { POLICIES_QUERY_RESULT } from "sanity.types";
import { sanityFetch } from "./live";
import { POLICIES_QUERY } from "./queries";

export type PolicyBody = ComponentProps<typeof PortableText>["value"];

export interface PolicyCallToAction {
  text: string | null;
  label: string;
  href: string;
}

export interface PolicyItemView {
  key: string;
  title: string;
  body: PolicyBody;
}

export interface PolicySectionView {
  key: string;
  slug: string;
  title: string;
  intro: PolicyBody;
  callToAction: PolicyCallToAction | null;
  items: PolicyItemView[];
}

export interface PoliciesView {
  intro: string;
  sections: PolicySectionView[];
}

export interface NumberedPolicySection {
  number: number;
  section: PolicySectionView;
}

function fromQuery(data: NonNullable<POLICIES_QUERY_RESULT>): PoliciesView {
  const sections = (data.sections ?? []).flatMap((section): PolicySectionView[] => {
    // The slug becomes an element id and a #anchor, so keep Visual Editing metadata out of it.
    const slug = section.slug ? stegaClean(section.slug) : "";
    if (!section.title || !slug) return [];

    const cta = section.callToAction;

    return [
      {
        key: section._key,
        slug,
        title: section.title,
        intro: toBody(section.intro),
        callToAction:
          cta?.label && cta.href
            ? { text: cta.text ?? null, label: cta.label, href: stegaClean(cta.href) }
            : null,
        items: (section.items ?? []).flatMap((item): PolicyItemView[] =>
          item.title ? [{ key: item._key, title: item.title, body: toBody(item.body) }] : [],
        ),
      },
    ];
  });

  return { intro: data.intro ?? "", sections };
}

export const getPolicies = (data: POLICIES_QUERY_RESULT): PoliciesView =>
  data ? fromQuery(data) : { intro: "", sections: [] };

const toBody = (value: unknown): PolicyBody =>
  (Array.isArray(value) ? value : []) as unknown as PolicyBody;

/** Loads one policy section by slug with its position among all sections, or null if absent. */
export async function fetchPolicySection(slug: string): Promise<NumberedPolicySection | null> {
  const result = await sanityFetch({ query: POLICIES_QUERY }).catch((error: unknown) => {
    console.error(`Could not load the ${slug} policies`, error);
    return null;
  });
  const { sections } = getPolicies(result?.data ?? null);
  const index = sections.findIndex((section) => section.slug === slug);
  const section = sections[index];

  return section ? { number: index + 1, section } : null;
}
