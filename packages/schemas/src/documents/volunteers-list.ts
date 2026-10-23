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
      name: "teams",
      title: "Teams",
      type: "array",
      description:
        'The teams that run Bal Vihar, what each does and who is on it, shown on the Administrative Team page. Drag to reorder. Leave empty to show "Coming soon."',
      of: [
        defineArrayMember({
          name: "team",
          title: "Team",
          type: "object",
          icon: UsersIcon,
          fields: [
            defineField({
              name: "name",
              title: "Team name",
              type: "string",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "description",
              title: "What this team does",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "members",
              title: "Members",
              type: "array",
              description:
                "Drag to reorder. Contact details are optional and public; only include details approved for the website. A person on more than one team is entered on each team.",
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
            select: { title: "name", subtitle: "description" },
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
