import { defineField } from "sanity";

/** A name with optional public email and phone, typed straight into the document that lists them. */
export const contactFields = () => [
  defineField({
    name: "name",
    title: "Name",
    type: "string",
    validation: (rule) => rule.required().min(1),
  }),
  defineField({
    name: "email",
    title: "Public email (optional)",
    type: "string",
    description: "Shown on the website. Only include details approved for the website.",
    validation: (rule) => rule.email(),
  }),
  defineField({
    name: "phone",
    title: "Public phone (optional)",
    type: "string",
    description: "Include the area code, e.g. 314-555-0123.",
    validation: (rule) => rule.regex(/^\+?[\d ()-]*\d[\d ()-]*$/).error("Enter a phone number."),
  }),
];
