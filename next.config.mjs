/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dexkit.com',
      },
    ],
  },
};

export default nextConfig;
