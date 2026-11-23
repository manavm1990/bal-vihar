import { SINGLETON_TYPES, schemaTypes } from "@bv/schemas";
import { DesktopIcon } from "@sanity/icons/Desktop";
import { EditIcon } from "@sanity/icons/Edit";
import { HomeIcon } from "@sanity/icons/Home";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { createDuplicateWithoutSlug } from "./actions/duplicate-without-slug";
import UndoUploadAction from "./actions/undo-upload";
import FormInput from "./components/form-input";
import Layout from "./components/layout";
import Logo from "./components/logo";
import ToolMenu from "./components/tool-menu";
import Home from "./home";
import { resolve } from "./presentation";
import { getAccess, type SectionId } from "./roles";
import { structure } from "./structure";
import { templates } from "./templates";
import { theme } from "./theme";

const CREATABLE_TYPES = new Map<string, SectionId>([
  ["calendarEvent", "calendar"],
  ["page", "pages"],
  ["photoAlbum", "photos"],
]);
const EDIT_ONLY_ACTIONS = new Set(["publish", "discardChanges", "restore"]);
const EDIT_ONLY_TYPE_SET = new Set<string>([...SINGLETON_TYPES, "classPage", "spreadsheetImport"]);

const isDev = process.env["NODE_ENV"] === "development";

const previewOrigin =
  process.env["SANITY_STUDIO_PREVIEW_ORIGIN"]?.replace(/\/$/, "") || "https://balvihar-stlouis.com";

export default defineConfig({
  name: "default",
  title: "Bal Vihar CMS",
  icon: Logo,
  theme,
  studio: { components: { layout: Layout, toolMenu: ToolMenu } },
  tools: (prev) => [{ name: "home", title: "Home", icon: HomeIcon, component: Home }, ...prev],
  projectId: "x5wq3sbt",
  dataset: "production",
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },

  plugins: [
    structureTool({ structure, title: "Edit", icon: EditIcon }),
    presentationTool({
      title: "Preview",
      icon: DesktopIcon,
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

  form: { components: { input: FormInput } },

  schema: {
    types: [...schemaTypes],
    templates: (prev) => [...prev, ...templates],
  },

  document: {
    newDocumentOptions: (prev, { currentUser }) => {
      const { canSee } = getAccess(currentUser);

      return prev.filter((item) => {
        const section = CREATABLE_TYPES.get(item.templateId);
        return section !== undefined && canSee(section);
      });
    },
    actions: (prev, { schemaType }) => {
      const allowed = EDIT_ONLY_TYPE_SET.has(schemaType)
        ? prev.filter(({ action }) => action && EDIT_ONLY_ACTIONS.has(action))
        : prev.map((action) =>
            action.action === "duplicate" ? createDuplicateWithoutSlug(action) : action,
          );

      return schemaType === "spreadsheetImport" ? [...allowed, UndoUploadAction] : allowed;
    },
  },
});
