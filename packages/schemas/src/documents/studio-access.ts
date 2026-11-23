import { LockIcon } from "@sanity/icons/Lock";
import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { isAdministrator } from "../field-rules";
import { STUDIO_ROLES } from "../studio-roles";

const MEMBER_FIELDS = [
  defineField({ name: "id", title: "Sanity user ID", type: "string" }),
  defineField({ name: "name", title: "Name", type: "string" }),
];

const getMemberId = (person: unknown) =>
  typeof person === "object" &&
  person !== null &&
  "member" in person &&
  typeof person.member === "object" &&
  person.member !== null &&
  "id" in person.member &&
  typeof person.member.id === "string"
    ? person.member.id
    : null;

const getRoleTitle = (role: unknown) => STUDIO_ROLES.find(({ value }) => value === role)?.title;

export const studioMember = defineType({
  name: "studioMember",
  title: "Person",
  type: "object",
  fields: MEMBER_FIELDS,
  validation: (rule) =>
    rule.custom((value) => (getMemberId({ member: value }) ? true : "Pick a person.")),
});

export const studioAccess = defineType({
  name: "studioAccess",
  title: "Who sees what",
  type: "document",
  icon: LockIcon,
  __experimental_omnisearch_visibility: false,
  readOnly: ({ currentUser }) => !isAdministrator(currentUser),
  fields: [
    defineField({
      name: "people",
      title: "People with a limited view",
      type: "array",
      description:
        "Anyone not listed sees everything. A role only hides menus and Home cards; it does not block access. Changes apply the next time the person opens or reloads the Studio.",
      of: [
        defineArrayMember({
          name: "studioPerson",
          title: "Person",
          type: "object",
          icon: UserIcon,
          fields: [
            defineField({
              name: "member",
              title: "Person",
              type: "studioMember",
              description: "Only people who already have a Sanity account for this project.",
            }),
            defineField({
              name: "role",
              title: "Sees",
              type: "string",
              options: { list: [...STUDIO_ROLES], layout: "radio" },
              validation: (rule) => rule.required().error("Pick what this person sees."),
            }),
            defineField({
              name: "classes",
              title: "Their classes",
              type: "array",
              of: [defineArrayMember({ type: "reference", to: [{ type: "classPage" }] })],
              hidden: ({ parent }) => parent?.role !== "teacher",
              validation: (rule) =>
                rule.custom((classes, { parent }) =>
                  typeof parent === "object" &&
                  parent !== null &&
                  "role" in parent &&
                  parent.role === "teacher" &&
                  (!Array.isArray(classes) || classes.length === 0)
                    ? "Pick at least one class for a teacher."
                    : true,
                ),
            }),
          ],
          preview: {
            select: { name: "member.name", role: "role", classes: "classes" },
            prepare: ({ name, role, classes }) => ({
              title: typeof name === "string" ? name : "Pick a person",
              subtitle: [
                getRoleTitle(role),
                Array.isArray(classes) && classes.length > 0
                  ? `${classes.length} ${classes.length === 1 ? "class" : "classes"}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · "),
            }),
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((people) => {
          const ids = Array.isArray(people) ? people.map(getMemberId).filter(Boolean) : [];
          return new Set(ids).size === ids.length ? true : "Each person can only be listed once.";
        }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Who sees what" }),
  },
});
