export interface SundayStep {
  time: string;
  title: string;
  detail: string;
}

export const sundaySteps: readonly SundayStep[] = [
  {
    time: "9:45 a.m.",
    title: "Doors open",
    detail: "Drop off at the side entrance of the Hindu Temple Community Center.",
  },
  {
    time: "10:00 a.m.",
    title: "Assembly",
    detail:
      "Groups K–3 start with Aarti in their classrooms. Groups 4–7 gather for assembly in the hall and stage areas.",
  },
  {
    time: "About an hour",
    title: "Classroom instruction",
    detail: "Culture, religion, history and geography, with art projects that follow the lessons.",
  },
  {
    time: "About an hour",
    title: "Yoga and bhajan",
    detail:
      "Half an hour of each. Groups K–3 have class first, then yoga and bhajan. Groups 4–7 do it the other way around.",
  },
  {
    time: "12:20 or 12:30 p.m.",
    title: "Dismissal",
    detail: "Groups K–3 finish at 12:20 p.m. and groups 4–7 at 12:30 p.m.",
  },
] as const;

export const sundayGroups = [
  {
    group: "K",
    rhythm: "Aarti and classroom instruction in the classroom, followed by yoga and bhajan.",
    dismissal: "Parents' lounge",
  },
  {
    group: "1–3",
    rhythm: "Aarti and classroom instruction in the classroom, followed by yoga and bhajan.",
    dismissal: "Side entrance",
  },
  {
    group: "4–7",
    rhythm: "Assembly in the hall, then classroom instruction and yoga and bhajan in the rotation.",
    dismissal: "Side entrance",
  },
  {
    group: "Youth",
    rhythm: "Check the class webpage for the day’s lesson, practice, and service-hour updates.",
    dismissal: "Per teacher",
  },
] as const;

export const sundayBringItems = [
  "A composition book and a pencil or pen",
  "A labeled bag or backpack",
  "A labeled yoga mat",
  "Colored markers or crayons",
  "Scissors and glue",
  "The Bal Vihar Bhajan Book. New families buy one.",
] as const;
