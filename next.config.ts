import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'abhbsihvzfxgmogknvwm.supabase.co' },
    ],
  },
};

export default nextConfig;
