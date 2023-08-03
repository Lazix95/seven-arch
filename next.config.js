/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
