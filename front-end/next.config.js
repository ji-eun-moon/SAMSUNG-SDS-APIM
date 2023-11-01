/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "src/styles/colors.scss";`,
  },
  images: {
    domains: ['findmyguide.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
