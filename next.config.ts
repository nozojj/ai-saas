import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbgixnduhbodfaknrwza.supabase.co",
      },
    ],
  },
};

export default nextConfig;