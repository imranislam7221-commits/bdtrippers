/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Adding output: 'standalone' can help in some cloud environments
  // but let's keep it simple first.
};

export default nextConfig;
