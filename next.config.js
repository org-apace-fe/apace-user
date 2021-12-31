/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "cloudinary",
    path: "",
    domains: ["images.pexels.com", "https://picsum.photos/", "useapace.com"],
  },
};
