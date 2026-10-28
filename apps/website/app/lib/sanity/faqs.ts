import { fetchSanityOrNull } from "./fetch";
import { type PolicyBody, parseBody } from "./policies";
import { FAQS_QUERY } from "./queries";

export interface FaqItemView {
  key: string;
  question: string;
  answer: PolicyBody;
}

interface FaqsData {
  items?:
    | readonly { _key: string; question: string | null; answer: PolicyBody | null }[]
    | null
    | undefined;
}

export async function fetchFaqs(): Promise<FaqItemView[]> {
  const result = await fetchSanityOrNull(FAQS_QUERY, "the FAQs");

  return getFaqs(result?.data);
}

export const getFaqs = (data: FaqsData | null | undefined): FaqItemView[] =>
  (data?.items ?? []).flatMap((item) =>
    item.question
      ? [{ key: item._key, question: item.question, answer: parseBody(item.answer) }]
      : [],
  );
