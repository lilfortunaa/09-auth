import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global", 
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
