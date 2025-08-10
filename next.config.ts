import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dance-of-mind-site' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dance-of-mind-site/' : '',
};

export default nextConfig;
