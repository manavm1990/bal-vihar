import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
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
