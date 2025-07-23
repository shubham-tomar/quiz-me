/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@quizme/shared'],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig