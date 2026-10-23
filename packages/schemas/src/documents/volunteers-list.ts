import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

export const volunteersList = defineType({
  name: "volunteersList",
  title: "Volunteers List",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "groups",
      title: "Volunteer groups",
      type: "array",
      description:
        "Review this legacy roster before publishing. Add, remove, or drag groups and members to reorder them. Contact details are optional and public; only include details approved for the website. A person listed in multiple groups must be updated in each group.",
      of: [
        defineArrayMember({
          name: "volunteerGroup",
          title: "Volunteer group",
          type: "object",
          icon: UsersIcon,
          fields: [
            defineField({
              name: "title",
              title: "Group name",
              type: "string",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "members",
              title: "Members",
              type: "array",
              of: [
                defineArrayMember({
                  name: "volunteerContact",
                  title: "Volunteer",
                  type: "object",
                  icon: UserIcon,
                  fields: [
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
                      validation: (rule) => rule.email(),
                    }),
                    defineField({
                      name: "phone",
                      title: "Public phone (optional)",
                      type: "string",
                      description: "Include the area code, e.g. +1 (314) 555-0123.",
                      validation: (rule) =>
                        rule.regex(/^\+?[\d ()-]*\d[\d ()-]*$/).error("Enter a phone number."),
                    }),
                  ],
                  preview: {
                    select: { title: "name", subtitle: "email" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Volunteers List" };
    },
  },
});
