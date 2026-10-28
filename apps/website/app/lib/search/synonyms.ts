import type { SynonymHit } from "algoliasearch";

export const SYNONYMS: SynonymHit[] = [
  { objectID: "bal-vihar", type: "synonym", synonyms: ["bal vihar", "balvihar"] },
  { objectID: "diwali", type: "synonym", synonyms: ["diwali", "deepavali", "dipavali"] },
  { objectID: "donate", type: "synonym", synonyms: ["donate", "donation", "giving", "gift"] },
  { objectID: "gita", type: "synonym", synonyms: ["gita", "geeta"] },
  { objectID: "mahabharata", type: "synonym", synonyms: ["mahabharata", "mahabharat"] },
  { objectID: "navratri", type: "synonym", synonyms: ["navratri", "navaratri"] },
  { objectID: "ramayana", type: "synonym", synonyms: ["ramayana", "ramayan"] },
  {
    objectID: "register",
    type: "synonym",
    synonyms: ["register", "registration", "enroll", "enrol", "enrollment"],
  },
  { objectID: "schedule", type: "synonym", synonyms: ["schedule", "timing", "timings"] },
  { objectID: "teacher", type: "synonym", synonyms: ["teacher", "faculty", "instructor"] },
  { objectID: "volunteer", type: "synonym", synonyms: ["volunteer", "volunteering"] },
];
