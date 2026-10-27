import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: "import-photo-links",
      displayName: "Import photos from pasted links",
      // Up to 40 links, fetched four at a time.
      timeout: 600,
      event: {
        on: ["create", "update"],
        // The handler clears pasteLinks when it finishes, which stops this filter matching, so
        // its own write can't trigger it again.
        filter: '_type == "photoAlbum" && defined(pasteLinks) && pasteLinks != ""',
        projection: "{_id, _rev, pasteLinks}",
        resource: { type: "dataset", id: "x5wq3sbt.production" },
      },
    }),
  ],
});
