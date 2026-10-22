import { SINGLETON_TYPES, schemaTypes } from "@bv/schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { resolve } from "./presentation/resolve";
import { structure } from "./structure";

/** Only calendar events are creatable from “New document”. */
const CREATABLE_TYPES = new Set(["calendarEvent"]);
const SINGLETON_TYPE_SET = new Set<string>(SINGLETON_TYPES);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

const isDev = process.env["NODE_ENV"] === "development";

const previewOrigin =
  process.env["SANITY_STUDIO_PREVIEW_ORIGIN"]?.replace(/\/$/, "") || "https://balviharstlouis.org";

export default defineConfig({
  name: "default",
  title: "Bal Vihar CMS",

  projectId: "x5wq3sbt",
  dataset: "production",

  plugins: [
    structureTool({ structure, title: "Edit" }),
    presentationTool({
      title: "Preview",
      resolve,
      previewUrl: {
        origin: previewOrigin,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    // Vision is a developer query tool — keep it out of the hosted editor UI.
    ...(isDev ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Editors can only create calendar events (singletons and legacy types are blocked).
    newDocumentOptions: (prev) => prev.filter((item) => CREATABLE_TYPES.has(item.templateId)),
    // Singletons can be edited and published, but not deleted, duplicated or unpublished.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPE_SET.has(schemaType)
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
});
