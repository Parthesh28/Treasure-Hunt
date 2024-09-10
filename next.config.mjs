/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  swcMinify: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
