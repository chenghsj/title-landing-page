const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/signup',
          destination: '/login',
        },
        {
          source: '/signin',
          destination: '/login',
        },
      ],
    };
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'title-video-resume-upload-test.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  ...withPWA({
    reactStrictMode: true,
    swcMinify: true,
  }),
  ...nextConfig,
};
