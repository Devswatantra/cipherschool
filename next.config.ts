import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚀 disables linting in production builds
  },
  typescript: {
    ignoreBuildErrors: true, // 🚀 ignores TS type errors during deployment
  },
};

export default nextConfig;
