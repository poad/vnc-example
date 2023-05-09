const withBundleAnalyzer = require('@next/bundle-analyzer');
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true
};

module.exports = analyzer(config);
