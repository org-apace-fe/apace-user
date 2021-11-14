/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.pexels.com", "https://picsum.photos/"],
  },
  env: {
    NEXT_PUBLIC_ENV_API_AUTH_URL: "https://apace-api-staging.azurewebsites.net",

  },
};

