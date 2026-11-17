import type { FAQS_QUERY_RESULT } from "sanity.types";
import { type PolicyBody, parseBody } from "./policies";

export interface FaqItemView {
  key: string;
  question: string;
  answer: PolicyBody;
}

export const getFaqs = (data: FAQS_QUERY_RESULT | undefined): FaqItemView[] =>
  (data?.items ?? []).flatMap((item) =>
    item.question
      ? [{ key: item._key, question: item.question, answer: parseBody(item.answer) }]
      : [],
  );
