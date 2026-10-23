import type { NewsEventData } from "./types";

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

export const mapNewsEvents = (input: unknown): NewsEventData[] =>
  !Array.isArray(input)
    ? []
    : input.flatMap((row) => {
        if (!isRecord(row)) return [];

        const id = isString(row["_id"]) ? row["_id"] : null;
        const title = isString(row["title"]) ? row["title"] : null;
        const publishedAt = isString(row["publishedAt"]) ? row["publishedAt"] : null;
        const summary = isString(row["summary"]) ? row["summary"] : null;

        return !id || !title || !publishedAt || !summary
          ? []
          : [
              {
                id,
                title,
                slug: isString(row["slug"]) ? row["slug"] : null,
                publishedAt,
                summary,
                body: isString(row["body"]) ? row["body"] : null,
                isFeatured: isBoolean(row["isFeatured"]) ? row["isFeatured"] : null,
                externalUrl: isString(row["externalUrl"]) ? row["externalUrl"] : null,
                image: isRecord(row["image"]) ? (row["image"] as NewsEventData["image"]) : null,
              },
            ];
      });
