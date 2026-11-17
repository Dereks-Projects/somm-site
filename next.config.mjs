// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // Retired course addresses (English and Spanish) now live under /courses
      {
        source: '/intro-course',
        destination: '/courses/introduction-to-wine',
        permanent: true,
      },
      {
        source: '/intro-course/:slug',
        destination: '/courses/introduction-to-wine/:slug',
        permanent: true,
      },
      {
        source: '/curso-introductorio',
        destination: '/courses/introduction-to-wine',
        permanent: true,
      },
      {
        source: '/curso-introductorio/:slug',
        destination: '/courses/introduction-to-wine/:slug',
        permanent: true,
      },
      // Retired study guide addresses now live under /study-guides
      {
        source: '/guides',
        destination: '/study-guides',
        permanent: true,
      },
      {
        source: '/guides/:slug',
        destination: '/study-guides/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
