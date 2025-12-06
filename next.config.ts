import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    domains: ["image.tmdb.org", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
