import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { describeCount } from "../describe-count";

const SUBJECTS = ["Class", "Bhajan", "Yoga", "Teachers"];

const GROUP_KINDS = [
  { title: "Bal Vihar group (K–7)", value: "balVihar" },
  { title: "Youth Group (Y1–Y5)", value: "youth" },
];

const personReference = () =>
  defineArrayMember({
    type: "reference",
    title: "Person",
    to: [{ type: "person" }],
  });

export const teachingFaculty = defineType({
  name: "teachingFaculty",
  title: "Teaching Faculty",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "schoolYear",
      title: "School year",
      type: "string",
      description: 'Shown under the page title, e.g. "2026–2027".',
      validation: (rule) => rule.required().error("Add the school year."),
    }),
    defineField({
      name: "groups",
      title: "Groups",
      type: "array",
      description:
        "One entry per group (K, 1, 2 … 7, then Y1 … Y4–5). Each group lists who teaches class, bhajan and yoga. Drag to reorder. Leave empty to show “Coming soon.”",
      of: [
        defineArrayMember({
          name: "teachingGroup",
          title: "Group",
          type: "object",
          icon: UsersIcon,
          fields: [
            defineField({
              name: "name",
              title: "Group name",
              type: "string",
              description: 'Exactly as parents know it: "K", "4", "Y2" or "Y4–5".',
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "kind",
              title: "Type",
              type: "string",
              options: { list: GROUP_KINDS, layout: "radio" },
              initialValue: "balVihar",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "teams",
              title: "Who teaches what",
              type: "array",
              description:
                "Add Class, Bhajan and Yoga for a Bal Vihar group. Use Teachers for a Youth Group.",
              of: [
                defineArrayMember({
                  name: "teachingTeam",
                  title: "Subject",
                  type: "object",
                  icon: UserIcon,
                  fields: [
                    defineField({
                      name: "subject",
                      title: "Subject",
                      type: "string",
                      options: { list: SUBJECTS, layout: "radio" },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "section",
                      title: "Section (optional)",
                      type: "string",
                      description: 'For example "Section 1A" or "Sections A & B".',
                    }),
                    defineField({
                      name: "teachers",
                      title: "Teachers",
                      type: "array",
                      description:
                        "Pick people from the list, or create a new person right here. Drag to reorder.",
                      of: [
                        defineArrayMember({
                          name: "teacher",
                          title: "Teacher",
                          type: "object",
                          icon: UserIcon,
                          fields: [
                            defineField({
                              name: "person",
                              title: "Person",
                              type: "reference",
                              to: [{ type: "person" }],
                              validation: (rule) => rule.required(),
                            }),
                            defineField({
                              name: "isBackup",
                              title: "Backup teacher",
                              type: "boolean",
                              initialValue: false,
                            }),
                          ],
                          preview: {
                            select: { title: "person.name", isBackup: "isBackup" },
                            prepare: ({ title, isBackup }) => ({
                              title: title || "Choose a person",
                              subtitle: isBackup ? "Backup" : undefined,
                            }),
                          },
                        }),
                      ],
                    }),
                    defineField({
                      name: "assistants",
                      title: "Youth assistants (optional)",
                      type: "array",
                      of: [defineArrayMember({ type: "youthAssistant" })],
                    }),
                  ],
                  preview: {
                    select: {
                      subject: "subject",
                      section: "section",
                      teachers: "teachers",
                    },
                    prepare: ({ subject, section, teachers }) => ({
                      title: [subject, section].filter(Boolean).join(" · ") || "Subject",
                      subtitle: describeCount(teachers, "teacher", "teachers"),
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", teams: "teams" },
            prepare: ({ title, teams }) => ({
              title: title ? `Group ${title}` : "Untitled group",
              subtitle: describeCount(teams, "subject", "subjects"),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "programs",
      title: "Programs and coordinators",
      type: "array",
      description:
        "Bhajan, Yoga, Art, Youth Group and similar programs, with their coordinators and teams. Drag to reorder.",
      of: [
        defineArrayMember({
          name: "teachingProgram",
          title: "Program",
          type: "object",
          icon: UsersIcon,
          fields: [
            defineField({
              name: "name",
              title: "Program name",
              type: "string",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "coordinators",
              title: "Coordinators",
              type: "array",
              of: [personReference()],
            }),
            defineField({
              name: "team",
              title: "Team",
              type: "array",
              of: [personReference()],
            }),
            defineField({
              name: "assistants",
              title: "Youth assistants (optional)",
              type: "array",
              of: [defineArrayMember({ type: "youthAssistant" })],
            }),
          ],
          preview: {
            select: { title: "name", coordinators: "coordinators" },
            prepare: ({ title, coordinators }) => ({
              title: title || "Untitled program",
              subtitle: describeCount(coordinators, "coordinator", "coordinators"),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { schoolYear: "schoolYear" },
    prepare: ({ schoolYear }) => ({
      title: "Teaching Faculty",
      subtitle: schoolYear,
    }),
  },
});
