import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
        port: "",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
