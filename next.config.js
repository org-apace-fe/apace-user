/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.pexels.com", "https://picsum.photos/", "useapace.com"],
  },
  // env: {
  //   NEXT_PUBLIC_ENV_API_AUTH_URL: "https://apace-api-staging.azurewebsites.net",
  //   NEXT_PUBLIC_ENV_AUTH_KEY:
  //     "QWBedD124fdfsd9w330KdeJBHF99GVDV4HFAGHDV45678SVAFCFA$67SJCV9876FCGHCCLCJHB4SNKSBB",
  // },
};

// https://api.useapace.com/
