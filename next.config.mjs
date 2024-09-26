import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redirectsJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'redirects.json'), 'utf8')
);

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
  async redirects() {
    return Object.entries(redirectsJson).map(([source, { destination, permanent }]) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
