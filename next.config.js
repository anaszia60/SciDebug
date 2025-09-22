/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
}

module.exports = nextConfig
