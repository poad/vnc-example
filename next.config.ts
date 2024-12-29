import { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
};

export default analyzer(config);
