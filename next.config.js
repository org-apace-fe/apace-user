/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "cloudinary",
    path: "https://beta.useapace.com",
    domains: ["images.pexels.com", "https://picsum.photos/", "useapace.com"],
  },
};
