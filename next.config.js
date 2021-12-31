/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "cloudinary",
    path: "https://orgapace.blob.core.windows.net",
    domains: ["images.pexels.com", "https://picsum.photos/", "useapace.com"],
  },
};
