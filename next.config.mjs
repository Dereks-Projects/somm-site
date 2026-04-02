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
    ];
  },
};

export default nextConfig;