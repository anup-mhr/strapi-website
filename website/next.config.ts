import type { NextConfig } from "next";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
const url = new URL(backendUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https", // ensure literal type
        hostname: url.hostname,
        port: url.port || undefined, // undefined if no port
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
