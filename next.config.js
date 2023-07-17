/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mudatabase.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mudatabase.net.",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
