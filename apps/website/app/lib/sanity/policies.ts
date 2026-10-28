import { stegaClean } from "@sanity/client/stega";
import type { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import type { POLICIES_QUERY_RESULT } from "sanity.types";
import { fetchSanityOrNull } from "./fetch";
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

function createPolicies(data: NonNullable<POLICIES_QUERY_RESULT>): PoliciesView {
  const sections = (data.sections ?? []).flatMap((section): PolicySectionView[] => {
    const slug = section.slug ? stegaClean(section.slug) : "";
    if (!section.title || !slug) return [];

    const cta = section.callToAction;

    return [
      {
        key: section._key,
        slug,
        title: section.title,
        intro: parseBody(section.intro),
        callToAction:
          cta?.label && cta.href
            ? { text: cta.text ?? null, label: cta.label, href: stegaClean(cta.href) }
            : null,
        items: (section.items ?? []).flatMap((item): PolicyItemView[] =>
          item.title ? [{ key: item._key, title: item.title, body: parseBody(item.body) }] : [],
        ),
      },
    ] as const;
  });

  return { intro: data.intro ?? "", sections } as const;
}

export const getPolicies = (data: POLICIES_QUERY_RESULT) =>
  data ? createPolicies(data) : { intro: "", sections: [] };

export const parseBody = (value: PolicyBody | null) => value ?? [];

export async function fetchPolicySection(slug: string) {
  const result = await fetchSanityOrNull(POLICIES_QUERY, `the ${slug} policies`);
  const { sections } = getPolicies(result?.data ?? null);
  const index = sections.findIndex((section) => section.slug === slug);
  const section = sections[index];

  return section ? ({ number: index + 1, section } as const) : null;
}
