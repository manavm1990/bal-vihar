import { schemaTypes } from "@bv/schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Bal Vihar CMS",

  projectId: "x5wq3sbt",
  dataset: "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
