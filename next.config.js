const withYAML = require("next-yaml");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "bitpay.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
// next.config.js
module.exports = withYAML(module.exports);
