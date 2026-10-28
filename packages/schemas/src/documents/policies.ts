import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

const LINK_SCHEMES = ["http", "https", "mailto", "tel"];

const policyBody = () => [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Subheading", value: "h5" },
    ],
    lists: [{ title: "Bullet list", value: "bullet" }],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              description: "Use /about-us/history for pages on this site, or a full https:// link.",
              validation: (rule) =>
                rule.required().uri({ allowRelative: true, scheme: LINK_SCHEMES }),
            }),
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    name: "policyTable",
    title: "Table",
    type: "object",
    fields: [
      defineField({
        name: "headers",
        title: "Column headings",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (rule) => rule.required().min(1),
      }),
      defineField({
        name: "rows",
        title: "Rows",
        type: "array",
        of: [
          defineArrayMember({
            name: "policyTableRow",
            title: "Row",
            type: "object",
            fields: [
              defineField({
                name: "cells",
                title: "Cells",
                type: "array",
                description: "One entry per column, in the same order as the column headings.",
                of: [defineArrayMember({ type: "string" })],
                validation: (rule) => rule.required().min(1),
              }),
            ],
            preview: {
              select: { cells: "cells" },
              prepare: ({ cells }: { cells?: string[] }) => ({
                title: (cells ?? []).join(" · "),
              }),
            },
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
      defineField({
        name: "footer",
        title: "Note under the table",
        type: "text",
        rows: 2,
      }),
    ],
    preview: {
      select: { headers: "headers" },
      prepare: ({ headers }: { headers?: string[] }) => ({
        title: "Table",
        subtitle: (headers ?? []).join(" · "),
      }),
    },
  }),
];

export const policies = defineType({
  name: "policies",
  title: "Policies & Procedures",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      description: "Shown at the top of the Policies & Procedures page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "This is the only copy of Bal Vihar’s policies on the website. Sections and items are numbered automatically, so reorder them by dragging. Review dates, fees and capacity numbers each year.",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "policySection",
          title: "Section",
          type: "object",
          icon: DocumentTextIcon,
          fields: [
            defineField({
              name: "title",
              title: "Section title",
              type: "string",
              description: "For example, “Admissions Policies”. Do not include a number.",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "slug",
              title: "Link name",
              type: "slug",
              description:
                "Used for links like /about-us/policies-procedures#admissions. Changing it breaks existing links to this section.",
              options: {
                // Sanity types `parent` as unknown; here it is the policy item holding this slug.
                source: (_document, { parent }) =>
                  (parent as { title?: string } | undefined)?.title ?? "",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "intro",
              title: "Text before the items (optional)",
              type: "array",
              of: policyBody(),
            }),
            defineField({
              name: "items",
              title: "Policy items",
              type: "array",
              validation: (rule) => rule.required().min(1),
              of: [
                defineArrayMember({
                  name: "policyItem",
                  title: "Policy item",
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Item title",
                      type: "string",
                      description: "Do not include a number; items are numbered automatically.",
                      validation: (rule) => rule.required().min(1),
                    }),
                    defineField({
                      name: "body",
                      title: "Policy text",
                      type: "array",
                      of: policyBody(),
                      validation: (rule) => rule.required().min(1),
                    }),
                  ],
                  preview: { select: { title: "title" } },
                }),
              ],
            }),
            defineField({
              name: "callToAction",
              title: "Call to action (optional)",
              type: "object",
              description:
                "A button shown under this section, for example a link to an online form.",
              fields: [
                defineField({ name: "text", title: "Text next to the button", type: "string" }),
                defineField({
                  name: "label",
                  title: "Button label",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "href",
                  title: "Button link",
                  type: "url",
                  validation: (rule) =>
                    rule.required().uri({ allowRelative: true, scheme: LINK_SCHEMES }),
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare: ({ title, items }: { title?: string; items?: unknown[] }) => ({
              title,
              subtitle: `${items?.length ?? 0} items`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Policies & Procedures" };
    },
  },
});
