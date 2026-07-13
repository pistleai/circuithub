import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/h",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
