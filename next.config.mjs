import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

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
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (moduleLoader.loader?.includes('postcss-loader')) {
          if (!moduleLoader.options) {
            moduleLoader.options = {};
          }
          if (!moduleLoader.options.postcssOptions) {
            moduleLoader.options.postcssOptions = {};
          }
          moduleLoader.options.postcssOptions.plugins = [
            tailwindcss,
            autoprefixer,
          ];
        }
      });
    });

    return config;
  },
};

export default nextConfig;