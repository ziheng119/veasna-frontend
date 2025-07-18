// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ NEW static export method
  images: {
    unoptimized: true, // ✅ disables built-in optimization
  },
  // ...other options
};

module.exports = nextConfig;
