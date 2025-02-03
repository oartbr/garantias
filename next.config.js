/** @type {import('next').NextConfig} 
const nextConfig = {
  eslint: {
    dirs: ["src", "playwright-tests"],
  },
};

module.exports = nextConfig;
*/

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "playwright-tests"],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
})(nextConfig);
