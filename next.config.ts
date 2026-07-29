import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    // Restrict build workers to 1 CPU to prevent container Out-Of-Memory (exit code 137) on Railway/Docker
    cpus: 1,
    workerThreads: false,
    // Enable filesystem caching for `next dev`
    turbopackFileSystemCacheForDev: true,
    // Disable filesystem cache during build in low-RAM container environments
    turbopackFileSystemCacheForBuild: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

import { withPayload } from '@payloadcms/next/withPayload';

export default withPayload(nextConfig);
