import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "https", hostname: "bikelover.com.bd" },
      { protocol: "https", hostname: "api.bikelover.com.bd" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/yamaha-used-bikes", destination: "/brand/yamaha", permanent: true },
      { source: "/honda-used-bikes", destination: "/brand/honda", permanent: true },
      { source: "/suzuki-used-bikes", destination: "/brand/suzuki", permanent: true },
      { source: "/tvs-used-bikes", destination: "/brand/tvs", permanent: true },
      { source: "/bajaj-used-bikes", destination: "/brand/bajaj", permanent: true },
      { source: "/hero-used-bikes", destination: "/brand/hero", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
