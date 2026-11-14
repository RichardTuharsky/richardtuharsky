import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Old GitHub Pages URL for the first guide.
        source: "/guides/data-360-crm-data-stream-troubleshooting.html",
        destination: "/guides/data-360-crm-data-stream-troubleshooting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
