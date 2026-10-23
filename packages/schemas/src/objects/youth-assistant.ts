import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const youthAssistant = defineType({
  name: "youthAssistant",
  title: "Youth assistant",
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
      name: "level",
      title: "Youth Group level",
      type: "string",
      options: { list: ["Y4", "Y5"], layout: "radio" },
      validation: (rule) => rule.required().error("Pick Y4 or Y5."),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "level" },
  },
});
