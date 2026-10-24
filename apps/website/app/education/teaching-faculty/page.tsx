import Article from "@components/article";
import { MutedP } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import { fetchSanityOrNull } from "@lib/sanity/fetch";
import { TEACHING_FACULTY_QUERY } from "@lib/sanity/queries";
import { getTeachingFacultyView } from "@lib/sanity/teaching-faculty";
import type { Metadata } from "next";

import TeachingFaculty from "./teaching-faculty.client";

const TITLE = "Teaching Faculty";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Who teaches each Bal Vihar group: class, bhajan and yoga teachers, youth assistants and program coordinators.",
};

export default async function TeachingFacultyPage() {
  const result = await fetchSanityOrNull(TEACHING_FACULTY_QUERY, "the teaching faculty");
  const view = getTeachingFacultyView(result?.data);
  const isEmpty = view.groups.length === 0 && view.programs.length === 0;

  return (
    <Article title={TITLE} subtitle={view.schoolYear ?? undefined} className="md:columns-1">
      {isEmpty ? <MutedP>Coming soon.</MutedP> : <TeachingFaculty view={view} />}
    </Article>
  );
}
