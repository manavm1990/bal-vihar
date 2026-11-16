export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "scope-enum": [
      2,
      "always",
      [
        "agents",
        "biome",
        "ci",
        "deps",
        "docs",
        "functions",
        "monorepo",
        "sanity",
        "schemas",
        "studio",
        "website",
      ],
    ],
  },
};
