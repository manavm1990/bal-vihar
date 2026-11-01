import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Sanity Live revalidates on demand, so cached Sanity data skips the default time-based expiry.
  cacheLife: { default: sanity },
  partialPrefetching: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  redirects: async () => [
    {
      source: "/community-projects",
      destination: "/about-us/community-outreach",
      permanent: true,
    },
    {
      source: "/education/curriculum-k-7",
      destination: "/education/curriculum#groups-k-7",
      permanent: true,
    },
    {
      source: "/education/curriculum-youth-group",
      destination: "/education/curriculum#youth-group",
      permanent: true,
    },
    { source: "/news-and-events", destination: "/calendar", permanent: true },
    {
      source: "/volunteering/volunteer-application",
      destination: "/volunteering#apply",
      permanent: true,
    },
    {
      source: "/volunteering/volunteer-opportunities",
      destination: "/volunteering",
      permanent: true,
    },
    { source: "/volunteering/why-volunteer", destination: "/volunteering", permanent: true },
  ],
  images: {
    remotePatterns: [
      {
        hostname: "d8n3.c1.e2-8.dev",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
