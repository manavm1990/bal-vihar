import { SINGLETON_TYPES, schemaTypes } from "@bv/schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { resolve } from "./presentation/resolve";
import { structure } from "./structure";

const SINGLETON_TYPE_SET = new Set<string>(SINGLETON_TYPES);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

// Editors preview against the public site. Developers may override for local Next.
const previewOrigin =
  process.env["SANITY_STUDIO_PREVIEW_ORIGIN"]?.replace(/\/$/, "") || "https://balviharstlouis.org";

export default defineConfig({
  name: "default",
  title: "Bal Vihar CMS",

  projectId: "x5wq3sbt",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Editors cannot create a second Home Page, Photo Gallery or Site Settings.
    newDocumentOptions: (prev) => prev.filter((item) => !SINGLETON_TYPE_SET.has(item.templateId)),
    // Singletons can be edited and published, but not deleted, duplicated or unpublished.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPE_SET.has(schemaType)
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
});
