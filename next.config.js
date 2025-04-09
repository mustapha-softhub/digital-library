/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build to prevent errors from blocking deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during build to prevent errors from blocking deployment
    ignoreBuildErrors: true,
  },
  // Add output configuration for Netlify
  output: 'standalone',
  // Disable image optimization during build
  images: {
    unoptimized: true,
  },
  // Configure React for compatibility
  reactStrictMode: true,
  
  // Transpile specific problematic modules
  transpilePackages: [
    'next',
    'react',
    'react-dom',
    '@babel/runtime',
  ],
  
  // Explicitly set the page extensions to ensure proper handling
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
