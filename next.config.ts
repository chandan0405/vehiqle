import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   serverComponentsHmrCache: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xwqilmiwgzijeatiweip.supabase.co",
      },
    ],
  },
};

export default nextConfig;
