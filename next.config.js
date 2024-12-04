/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { isServer }) => {
    // Handle undici and other node modules
    config.module.rules.push({
      test: /\.m?js$/,
      include: [
        /node_modules\/@firebase\/auth/,
        /node_modules\/undici/,
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-private-methods',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    });

    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: require.resolve('path-browserify'),
      net: false,
      dns: false,
      tls: false,
      assert: false,
      util: false,
      stream: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
      url: false,
      zlib: false,
    };

    return config;
  },
};

module.exports = nextConfig;