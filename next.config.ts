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
      {
        source: "/(media|catagory|images|brand-logos|hero-sequence)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  typedRoutes: true,
  experimental: {
    // Restrict build workers to 1 CPU and disable multi-threading to prevent OOM (exit code 137) on Railway/Docker
    cpus: 1,
    workerThreads: false,
    webpackBuildWorker: false,
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
    minimumCacheTTL: 31536000,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [70, 75, 90, 95],
  },
};

import { withPayload } from '@payloadcms/next/withPayload';

export default withPayload(nextConfig);
