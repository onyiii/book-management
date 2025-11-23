import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
      ],
    },
  },
  /* config options here */
};

export default nextConfig;
