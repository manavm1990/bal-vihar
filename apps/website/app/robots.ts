import { SITE_URL } from "@lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Crawlers following search links would use up the Algolia search quota.
      disallow: ["/api/", "/search"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
