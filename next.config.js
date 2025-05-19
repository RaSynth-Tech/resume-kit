/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Tell the compiler not to bundle the Node-only library
      serverComponentsExternalPackages: ['pdf-parse'],
    },
    // (optional) leave Pages Router transpile rules alone
    // transpilePackages: [],
  };
  
  module.exports = nextConfig;
  