/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.bankit.in',
        port: '9090',
        pathname: '/CAPS/images/**',
      },
      {
        protocol: 'https',
        hostname: 'portal.bankit.in',
        port: '9090',
        pathname: '/Demo/wl/**',
      },
    ],
  },
};

export default nextConfig;
