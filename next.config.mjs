import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // RAM & Memory Optimization: Automatically disposes inactive pages from memory
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    // Tree-shake large packages during compilation to save Node.js RAM
    optimizePackageImports: [
      'lucide-react',
      '@tabler/icons-react',
      'motion',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tooltip',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.ramx.in',
      },
      {
        protocol: 'https',
        hostname: 'ramx.in',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/projects/imageeditorai',
        destination: '/projects/figart',
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
