import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   unoptimized: true,
  // },
  // output: "export",
  // trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
