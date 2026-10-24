import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { describeCount } from "../describe-count";

export const volunteerRoster = defineType({
  name: "volunteerRoster",
  title: "Thank-you list (event volunteers)",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description: 'Shown under the page title, e.g. "2017–2018".',
      validation: (rule) => rule.required().error("Add the school year."),
    }),
    defineField({
      name: "activities",
      title: "Events and teams",
      type: "array",
      description:
        "One entry per event or team volunteers signed up for, such as Diwali or Teaching. Drag to reorder. Leave empty to show “Coming soon.”",
      of: [
        defineArrayMember({
          name: "volunteerActivity",
          title: "Event or team",
          type: "object",
          icon: UsersIcon,
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "volunteers",
              title: "Volunteers",
              type: "array",
              description:
                "Type a name and press Enter. A person who helped with several events is added to each one.",
              of: [defineArrayMember({ type: "string", icon: UserIcon })],
              options: { layout: "tags" },
              validation: (rule) => rule.unique(),
            }),
          ],
          preview: {
            select: { title: "name", volunteers: "volunteers" },
            prepare: ({ title, volunteers }) => ({
              title: title || "Untitled",
              subtitle: describeCount(volunteers, "volunteer", "volunteers"),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { schoolYear: "schoolYear" },
    prepare: ({ schoolYear }) => ({
      title: "Thank-you list (event volunteers)",
      subtitle: schoolYear,
    }),
  },
});
