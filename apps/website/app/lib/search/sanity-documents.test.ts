import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";
import { createSanitySearchDocuments } from "./sanity-documents";

const EMPTY = { albums: [], classes: [], events: [], faqs: null, policies: null } as const;

test("current editor pages are searchable by description and body text; archived ones are not", () => {
  const documents = createSanitySearchDocuments({
    ...EMPTY,
    now: new Date("2026-11-17T18:00:00Z"),
    pages: [
      {
        _id: "page-1",
        title: "Diwali Show",
        slug: "diwali-2026",
        description: "Our annual show.",
        endsOn: "2026-11-20",
        body: [
          {
            _type: "block",
            _key: "a",
            children: [{ _type: "span", _key: "b", text: "Doors open at five" }],
          },
        ],
      },
      {
        _id: "page-2",
        title: "Old picnic",
        slug: "picnic-2025",
        description: "Last year.",
        endsOn: "2025-06-01",
        body: [],
      },
    ],
  });

  deepStrictEqual(documents, [
    {
      id: "editor-page:page-1",
      title: "Diwali Show",
      section: "Events & Community › Pages",
      href: "/diwali-2026",
      text: "Our annual show. Doors open at five",
    },
  ]);
});
