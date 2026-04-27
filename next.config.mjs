/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Default is 1mb; brand assets (PDFs, fonts, photos) routinely exceed it.
      // 4mb stays under Vercel's 4.5mb serverless function request ceiling.
      // For files larger than this, switch to a signed-URL direct upload.
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
