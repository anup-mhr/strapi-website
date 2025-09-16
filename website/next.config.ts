import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/^https?:\/\//, "") ||
          "",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
      {
        protocol: "http",
        hostname:
          process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/^http?:\/\//, "") || "",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },

      // Optional: Keep localhost for development
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
