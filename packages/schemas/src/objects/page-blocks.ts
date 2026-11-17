import { defineArrayMember } from "sanity";
import { LINK_ANNOTATION } from "./link-annotation";

const DECORATORS = [
  { title: "Bold", value: "strong" },
  { title: "Italic", value: "em" },
];

export const createBodyBlock = () =>
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading", value: "h2" },
      { title: "Subheading", value: "h3" },
    ],
    lists: [
      { title: "Bullet list", value: "bullet" },
      { title: "Numbered list", value: "number" },
    ],
    marks: { decorators: DECORATORS, annotations: [LINK_ANNOTATION] },
  });

export const createSimpleBlock = () =>
  defineArrayMember({
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [{ title: "Bullet list", value: "bullet" }],
    marks: { decorators: DECORATORS, annotations: [LINK_ANNOTATION] },
  });
