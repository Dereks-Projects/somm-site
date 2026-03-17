/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    loader: 'custom',
    loaderFile: './sanity-image-loader.js',
  },
};

export default nextConfig;