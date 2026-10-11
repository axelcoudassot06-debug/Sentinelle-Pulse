import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Carte de visite numérique (QR code et puce NFC des badges)
      { source: "/axel", destination: "/axel/index.html" },
    ];
  },
};

export default nextConfig;
