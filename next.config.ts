import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bonobo.co.kr',
        pathname: '/admin/files/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bonobo.co.kr',
        pathname: '/admin/files/**',
      },
      {
        protocol: 'http',
        hostname: 'bonobo.co.kr',
        pathname: '/admin/files/**',
      },
      {
        protocol: 'http',
        hostname: 'www.bonobo.co.kr',
        pathname: '/admin/files/**',
      },
    ],
  },
};

export default nextConfig;
