const withPlugins =  require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = withPlugins([
  [analyzer],
],
  {
    reactStrictMode: true,
    swcLoader: true,
    swcMinify: true
  }
);

module.exports = config;
