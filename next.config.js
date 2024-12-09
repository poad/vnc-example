// @ts-check
import withBundleAnalyzer from '@next/bundle-analyzer';
const analyzer = withBundleAnalyzer({
  enabled: import.meta.env?.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true
};

export default analyzer(config);
