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

export const fetchFaqs = async (): Promise<FaqItemView[]> =>
  getFaqs((await fetchSanityOrNull(FAQS_QUERY, "the FAQs"))?.data);

export const getFaqs = (data: FaqsData | null | undefined) =>
  (data?.items ?? []).flatMap((item) =>
    item.question
      ? [{ key: item._key, question: item.question, answer: parseBody(item.answer) }]
      : [],
  );
