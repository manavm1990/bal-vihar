const DEFAULT_API_VERSION = "2025-01-01";
const DEFAULT_DATASET = "production";
const DEFAULT_PROJECT_ID = "x5wq3sbt";

const API_VERSION = process.env["NEXT_PUBLIC_SANITY_API_VERSION"] ?? DEFAULT_API_VERSION;
const DATASET = process.env["NEXT_PUBLIC_SANITY_DATASET"] ?? DEFAULT_DATASET;
const PROJECT_ID = process.env["NEXT_PUBLIC_SANITY_PROJECT_ID"] ?? DEFAULT_PROJECT_ID;
const SANITY_READ_TOKEN = process.env["SANITY_API_READ_TOKEN"];

export {
  API_VERSION as apiVersion,
  DATASET as dataset,
  PROJECT_ID as projectId,
  SANITY_READ_TOKEN as sanityReadToken,
};
