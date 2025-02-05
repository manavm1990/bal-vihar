import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'd8n3.c1.e2-8.dev',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
