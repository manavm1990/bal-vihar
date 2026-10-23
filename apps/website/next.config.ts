import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    { source: "/giving/event-sponsors", destination: "/giving", permanent: true },
    { source: "/giving/give-online", destination: "/giving", permanent: true },
    { source: "/giving/make-a-gift", destination: "/giving", permanent: true },
    {
      source: "/giving/matching-gift-companies",
      destination: "/giving/matching-gifts",
      permanent: true,
    },
    {
      source: "/giving/matching-gift-program",
      destination: "/giving/matching-gifts",
      permanent: true,
    },
    { source: "/giving/welcome-message", destination: "/giving", permanent: true },
    { source: "/news-and-events", destination: "/calendar", permanent: true },
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
