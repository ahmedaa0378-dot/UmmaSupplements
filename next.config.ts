import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Generated imagery is hosted on Higgsfield until it moves to Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net", port: "", search: "" },
      { protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net", port: "", search: "" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
