import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "x5wq3sbt",
    dataset: "production",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
  },
  typegen: {
    // Website queries live outside Studio; schemas come from @bv/schemas via sanity.config.
    path: "../website/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../website/sanity.types.ts",
    overloadClientMethods: true,
  },
});
